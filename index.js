const querystring = require('querystring')
const request     = require('request')
const exec        = require('executive')
const memcached   = require('memcached')

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

class AMG {

    constructor (object) {
      this.private_api_url          = object['private_api'].url
      this.private_api_access_token = object['private_api'].access_token
      this.memcached                = new memcached(object['memcashed'].server, object['memcashed'].options)
      this.memcached_update_mc      = object['memcashed'].update
      this.memcached_update_sec     = this.memcached_update_mc / 1000 * 2
    }

    reg (email, passw, name) {
      return new Promise((resolve, reject) => {
        this.add(`users`, { email: email, password: passw, name: name }).then(reg => resolve(reg), err => reject(err))
      })
    }

    auth (email, passw) {
      return new Promise((resolve, reject) => {
        let url = `${this.private_api_url}/auth`
        exec.quiet([`curl -X POST ${url} -i -u ${email}:${passw} -d "access_token=${this.private_api_access_token}"`], (err, stdout, stderr) => {
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
        request.get(`${this.private_api_url}/users/me?access_token=${access_token}`, (error, response, body) => {
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
          url:     `${this.private_api_url}/${type}`,
          body:    `access_token=${this.private_api_access_token}&${querystring.stringify(data)}`
        }, (error, response, body) => {
          if(error) reject(error)
          resolve(JSON.parse(body))
        })
      })
    }

    get (type, data) {
      return new Promise((resolve, reject) => {
        this.memcached.get(type, (err, cache) => {
          if (typeof cache == 'undefined') {
            request.get(`${this.private_api_url}/${type}?access_token=${this.private_api_access_token}&${data}`, (error, response, body) => {
              if(error) reject(error)
              try {
                body = JSON.parse(body)
                if(typeof body.rows === 'undefined') {
                  resolve(body)
                }else{
                  this.memcached.add(type, body, this.memcached_update_sec, (err) => {})
                  setInterval(() => {
                    request.get(`${this.private_api_url}/${type}?access_token=${this.private_api_access_token}&${data}`, (error, response, body) => {
                      body = JSON.parse(body)
                      this.memcached.replace(type, body, this.memcached_update_sec, (err) => {})
                    })
                  }, this.memcached_update_mc)
                  if (Object.values(data).length == 0) {
                    resolve(body.rows)
                  }else{
                    resolve(body.rows.find(data))
                  }
                }
              } catch (e) {
                reject('err')
              }
            })
          }else{
            if (Object.values(data).length == 0) {
              resolve(cache.rows)
            }else{
              resolve(cache.rows.find(data))
            }
          }
        })
      })
    }

    update (type, id, data) {
      return new Promise((resolve, reject) => {
        this.get(type, { id: id })
        .then(
          getData => {
            let values = Object.values(getData[0])
            let keys   = Object.keys(getData[0])
            let params = ''
            for (let i = 0; i <= keys.length; i++) {
              if (i == keys.length) {
                request.put({
                  headers: {'content-type' : 'application/x-www-form-urlencoded'},
                  url:     `${this.private_api_url}/${type}/${id}`,
                  body:    `access_token=${this.private_api_access_token}${params}`
                }, (error, response, body) => {
                  if(error) reject(error)
                  resolve(JSON.parse(body))
                })
              }else{
                if (typeof data[keys[i]] != 'undefined') {
                  params = `${params}&${keys[i]}=${data[keys[i]]}`
                }else{
                  params = `${params}&${keys[i]}=${values[i]}`
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

}

module.exports = AMG
