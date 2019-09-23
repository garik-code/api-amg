const Memcached = require('memcached')
const memcached = new Memcached('127.0.0.1:11211', {})

memcached.add('foo', 'bar', 10, (err) => {
  console.log(err)
})

setInterval(() => {
  memcached.get('foo', (err, data) => {
    console.log(data)
  })
}, 1000)
