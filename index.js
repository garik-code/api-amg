const querystring = require('querystring')
const request     = require('request')
const exec        = require('executive')

Array.prototype.find = function (params) {
  let values_params  = Object.values(params)
  let keys_params    = Object.keys(params)
  let res = []
  for (let i = 0; i <= this.length; i++) {
    if (i == this.length) {
      return res
    }else{
      let search = 0
      for (let x = 0; x <= keys_params.length; x++) {
        if (x == keys_params.length) {
          if (search == keys_params.length) {
            res.push(this[i])
          }
        }else{
          if (this[i][keys_params[x]] == values_params[x]) {
            search++
          }
        }
      }
    }
  }
}

exports.reg = (email, passw, name, key, api) => {
  return new Promise((resolve, reject) => {
    exports.add(`users`, { email: email, password: passw, name: name }, key, api).then(reg => resolve(reg), err => reject(err))
  })
}

exports.auth = (email, passw, key, api) => {
  return new Promise((resolve, reject) => {
    let url = `${api}/auth`
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
  return new Promise((resolve, reject) => {
    request.get(`${api}/users/me?access_token=${token}`, (error, response, body) => {
      if(error) reject(error)
      try {
        body = JSON.parse(body)
        resolve(body)
      } catch (e) {
        reject('Unauthorized')
      }
    })
  })
}

exports.add = (type, data, key, api) => {
  return new Promise((resolve, reject) => {
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     `${api}/${type}`,
      body:    `access_token=${key}&${querystring.stringify(data)}`
    }, (error, response, body) => {
      if(error) reject(error)
      resolve(JSON.parse(body))
    })
  })
}

exports.get = (type, data, key, api) => {
  return new Promise((resolve, reject) => {
    request.get(`${api}/${type}?access_token=${key}&${data}`, (error, response, body) => {
      if(error) reject(error)
      try {
        body = JSON.parse(body)
        if(typeof body.rows === 'undefined') resolve(body)
        if (Object.values(data).length == 0) {
          resolve(body.rows)
        }else{
          resolve(body.rows.find(data))
        }
      } catch (e) {
        reject('err')
      }
    })
  })
}

exports.update = (id, type, data, key, api) => {
  return new Promise((resolve, reject) => {
    exports.get(type, { id: id })
    .then(
      getData => {
        let keys = Object.keys(getData[0])
        let values = Object.values(getData[0])
        for (let i = 0; i <= keys.length; i++) {
          if (i == keys.length) {
            request.put({
              headers: {'content-type' : 'application/x-www-form-urlencoded'},
              url:     `${api}/${type}/${id}`,
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
