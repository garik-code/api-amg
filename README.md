# API ❤ AMG

Install memcached : https://memcached.org/downloads

Install mongodb   : https://docs.mongodb.com/manual/installation/

Install nodejs    : https://nodejs.org/en/download/


``` Javascript

/////////////////////////////////////////////////////////////////


// Install generator private api

npm install -g yo
npm install -g generator-rest

// Generate a new PRIVATE API

cd /my-project
mkdir private-api
cd private-api
yo rest

// Generate a new API ENDPOINT inside your project

yo rest:api

// Take private api access token (MASTER_KEY)

nano .env

// Install AMG

cd /my-project
mkdir rest-api
cd rest-api
npm init
npm i api-amg --save
nano index.js

...

```

``` javascript

const Amg = require('api-amg')
const Api = new Amg({
  private_api    : {
    access_token : 'j8jx10hcOvxKP0kNPTEBzofBdfHgjjtZ', // private api access token
    url          : 'http://localhost:9000'             // private api url
  },
  memcashed : {
    server  : '127.0.0.1:11211', // memcashed server
    options : {},                // memcached options
    update  : 1000               // millisecond update time
  }
})

```
``` javascript

// User registration:

Api.reg('admin@example.com', 'password', 'Igor M')
.then(
  success => console.log(success),
  err     => console.log(err)
)

// {
//   id: '5d88e96aa9a6fe07ef29fbca',
//   name: 'Igor M',
//   picture: 'https://gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?d=identicon',
//   email: 'admin@example.com',
//   createdAt: '2019-09-23T15:48:58.409Z'
// }

```
``` javascript

// User authorization:

Api.auth('admin@example.com', 'password')
.then(
  success => console.log(success),
  err     => console.log(err)
)

// {
//   access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODhlOTZhYTlhNmZlMDdlZjI5ZmJjYSIsImlhdCI6MTU2OTI1MzgwN30.52CBLLzNvYLvavVrgIFPJ6x0KtwFU1WYNG4u_F0m-iA'
// }

```
``` javascript

// User authorization check:

Api.check('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODhlOTZhYTlhNmZlMDdlZjI5ZmJjYSIsImlhdCI6MTU2OTI1MzgwN30.52CBLLzNvYLvavVrgIFPJ6x0KtwFU1WYNG4u_F0m-iA')
.then(
  success => console.log(success),
  err     => console.log(err)
)

// {
//   id: '5d88e96aa9a6fe07ef29fbca',
//   name: 'Igor M',
//   picture: 'https://gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?d=identicon',
//   email: 'admin@example.com',
//   createdAt: '2019-09-23T15:48:58.409Z'
// }

```
``` javascript

// Add data:

Api.add('tests', { text: '123' })
.then(
  success => console.log(success),
  err     => console.log(err)
)

// {
//   id: '5d88eac4a9a6fe07ef29fbcb',
//   text: '123',
//   createdAt: '2019-09-23T13:51:16.341Z',
//   updatedAt: '2019-09-23T17:27:55.871Z'
// }

```
``` javascript

// Get data:

Api.get('tests', { id: '5d88eac4a9a6fe07ef29fbcb' })
.then(
  success => console.log(success),
  err     => console.log(err)
)

// [
//   {
//     id: '5d88eac4a9a6fe07ef29fbcb',
//     text: '123',
//     createdAt: '2019-09-23T13:51:16.341Z',
//     updatedAt: '2019-09-23T17:27:55.871Z'
//   }
// ]

```
``` javascript

// Update data:

Api.update('tests', '5d88eac4a9a6fe07ef29fbcb', { text: '123456' })
.then(
  success => console.log(success),
  err     => console.log(err)
)

// {
//   id: '5d88eac4a9a6fe07ef29fbcb',
//   text: '123456',
//   createdAt: '2019-09-23T13:51:16.341Z',
//   updatedAt: '2019-09-23T17:27:55.871Z'
// }

```
