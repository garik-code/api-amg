const Amg = require('api-amg')
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

Api.reg('test@example.com', 'rootroot', 'root')
.then(
  success => console.log(success),
  err     => console.log(err)
)
