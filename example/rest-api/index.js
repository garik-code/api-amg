const Amg = require('api-amg')
const express = require('express')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')
const routeCache = require('route-cache')
const cors = require('cors')
const app = express()

const Api = new Amg({
  private_api    : {
    access_token : 'j8jx10hcOvxKP0kNPTEBzofBdfHgjjtZ', // private api access token (MASTER_KEY)
    url          : 'http://localhost:9000'             // private api url
  },
  memcashed : {
    server  : '127.0.0.1:11211', // memcashed server
    options : {},                // memcached options
    update  : 1000               // millisecond update time
  }
})
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Activity detected. Your IP address is blocked for 15 minutes.'
})
const brutalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Activity detected. Your IP address is blocked for 1 hour.'
})

app.use(cors())
app.use(fileUpload())
app.use(limiter)
app.use('/auth', brutalLimiter)
app.use('/reg', brutalLimiter)

// app.get('/news/:token', routeCache.cacheSeconds(1), (req, res, next) => {
//   News.search(req.params.token)
//   .then(
//     json => res.send(json),
//     err => res.send(err)
//   )
// })

app.post('/auth', (req, res) => {
  res.send(req.params)
})

app.post('/reg', (req, res) => {
  res.send(req.params)
})

app.post('/security', (req, res) => {
  res.send(req.params)
})

app.post('/update', (req, res) => {
  res.send(req.params)
})

app.post('/add', (req, res) => {
  res.send(req.params)
})

app.post('/get', routeCache.cacheSeconds(2), (req, res) => {
  let access_token = ''
  let type         = ''
  let data         = {}
  if (typeof req.body.access_token != 'string') {
    res.json({ err: 'access_token' }).status(500)
  }else{
    access_token = req.body.access_token
  }
  Api.check(access_token)
  .then(
    success => {
      if (typeof req.body.type != 'string') {
        res.json({ err: 'type' }).status(500)
      }else{
        type = req.body.type.toLowerCase()
      }
      if (typeof req.body.data == 'string') {
        try {
          data = JSON.parse(req.body.data)
        } catch (e) {}
      }
      Api.get(type, data)
      .then(
        success => res.json(success).status(200),
        err     => res.json(err).status(500)
      )
    },
    err => res.json({ err: 'access_token' }).status(500)
  )
})

app.listen(1313)

// Api.reg('test@example.com', 'rootroot', 'root')
// .then(
//   success => console.log(success),
//   err     => console.log(err)
// )
