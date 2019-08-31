const request = require('request')
const exec = require('executive')

exports.reg = (email, passw, name) => {
  return new Promise((resolve, reject) => {
    exports.add(`users`, `email=${email}&password=${passw}&name=${name}`).then(reg => resolve(reg), err => reject(err))
  })
}

exports.auth = (email, passw, key, api) => {
  return new Promise((resolve, reject) => {
    let url = `http://${api}/auth`
    exec.quiet([`curl -X POST ${url} -i -u ${email}:${passw} -d "access_token=${key}"`], (err, stdout, stderr) => {
      try {
        let token = stdout.split('"token":"')[1].split('","user')[0]
        resolve(token)
      } catch (e) {
        reject('Unauthorized')
      }
    })
  })
}

exports.check = (token, key, api) => {
  console.log(token);
  return new Promise((resolve, reject) => {
    request.get(`http://${api}/users/me?access_token=${token}`, (error, response, body) => {
      if(error) reject(error)
      try {
        body = JSON.parse(body)
        resolve(body)
      } catch (e) {
        reject('err get data')
      }
    })
  })
}

exports.get = (type, data, key, api) => {
  return new Promise((resolve, reject) => {
    request.get(`http://${api}/${type}?access_token=${key}&${data}`, (error, response, body) => {
      if(error) reject(error)
      try {
        body = JSON.parse(body)
        if(typeof body.rows === 'undefined') resolve(body)
        resolve(body.rows)
      } catch (e) {
        reject('err get data')
      }
    })
  })
}

exports.add = (type, data, key, api) => {
  return new Promise((resolve, reject) => {
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     `http://${api}/${type}`,
      body:    `access_token=${key}&${data}`
    }, (error, response, body) => {
      if(error) reject(error)
      resolve(body)
    })
  })
}

exports.update = (id, type, data, key, api) => {
  return new Promise((resolve, reject) => {
    exports.get(type, `id=${id}`)
    .then(
      getData => {
        let keys = Object.keys(getData[0])
        let values = Object.values(getData[0])
        for (let i = 0; i <= keys.length; i++) {
          if (i == keys.length) {
            request.put({
              headers: {'content-type' : 'application/x-www-form-urlencoded'},
              url:     `http://${api}/${type}/${id}`,
              body:    `access_token=${key}&${data}`
            }, (error, response, body) => {
              if(error) reject(error)
              resolve(body)
            })
          }else{
            if (data.indexOf(keys[i]) < 0) {
              data = `${data}&${keys[i]}=${values[i]}`
            }
          }
        }
      },
      error => {
        reject(error)
      }
    )
  })
}
