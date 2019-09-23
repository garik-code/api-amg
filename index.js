const querystring = require('querystring')
const request     = require('request')
const exec        = require('executive')

class AMG {

    constructor (object) {
      this.url = object.url
      this.access_token = object.access_token
    }

    reg (email, passw, name) {
      return new Promise((resolve, reject) => {
        this.add(`users`, { email: email, password: passw, name: name }).then(reg => resolve(reg), err => reject(err))
      })
    }

    auth (email, passw) {
      return new Promise((resolve, reject) => {
        let url = `${this.url}/auth`
        exec.quiet([`curl -X POST ${url} -i -u ${email}:${passw} -d "access_token=${this.access_token}"`], (err, stdout, stderr) => {
          try {
            let token = stdout.split('"token":"')[1].split('","user')[0]
            resolve({ access_token: token })
          } catch (e) {
            reject('Unauthorized')
          }
        })
      })
    }

    check (access_token) {
      return new Promise((resolve, reject) => {
        request.get(`${this.url}/users/me?access_token=${access_token}`, (error, response, body) => {
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

    add (type, data) {
      return new Promise((resolve, reject) => {
        request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url:     `${this.url}/${type}`,
          body:    `access_token=${this.access_token}&${querystring.stringify(data)}`
        }, (error, response, body) => {
          if(error) reject(error)
          resolve(JSON.parse(body))
        })
      })
    }

    get (type, data) {
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
      return new Promise((resolve, reject) => {
        request.get(`${this.url}/${type}?access_token=${this.access_token}&${data}`, (error, response, body) => {
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

    update (type, id, data) {
      return new Promise((resolve, reject) => {
        this.get(type, { id: id })
        .then(
          getData => {
            console.log('test');
            console.log(getData);
            let values = Object.values(getData[0])
            let keys   = Object.keys(getData[0])
            for (let i = 0; i <= keys.length; i++) {
              if (i == keys.length) {
                // request.put({
                //   headers: {'content-type' : 'application/x-www-form-urlencoded'},
                //   url:     `${this.url}/${type}/${id}`,
                //   body:    `access_token=${this.access_token}&${data}`
                // }, (error, response, body) => {
                //   if(error) reject(error)
                //   resolve(body)
                // })
              }else{
                // if (data.indexOf(keys[i]) < 0) {
                //   data = `${data}&${keys[i]}=${values[i]}`
                // }
              }
            }
          },
          error => {
            reject(error)
          }
        )
      })
    }

}

module.exports = AMG
