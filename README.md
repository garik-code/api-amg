# API ❤ AMG


Install mongodb: https://docs.mongodb.com/manual/installation/


``` Javascript

/////////////////////////////////////////////////////////////////


// INSTALL AMG

npm install api-amg --save
npm install -g yo
npm install -g generator-rest


// generate a new PRIVATE API

yo rest


// generate a new API ENDPOINT inside your project

yo rest:api


/////////////////////////////////////////////////////////////////

```

``` javascript

const Api = require('api-amg')

```
``` javascript

// REG USER:

Api.reg('mail@garik.site', 'password', 'Igor M', key, api)
.then(
  success => console.log(success),
  err     => console.log(err)
)

// {
//   "id":"5d88c9e9a9a6fe07ef29fbb9",
//   "name":"Igor M",
//   "picture":"https://gravatar.com/avatar/3a0783a28ee076b86376fb308d9e194d?d=identicon",
//   "email":"mail@garik.site",
//   "createdAt":"2019-09-23T13:34:33.754Z"
// }

```
``` javascript

// AUTH USER:

Api.auth('mail@garik.site', 'password', key, api)
.then(
  success => console.log(success),
  err     => console.log(err)
)

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODhjOWU5YTlhNmZlMDdlZjI5ZmJiOSIsImlhdCI6MTU2OTI0NTc2OH0.LbSkr0z1MhQhN5CJZTrc0GAD19ZJlDn-L3jIIWf1dPE

```
``` javascript

// CHECK AUTH USER:

Api.check('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODhjOWU5YTlhNmZlMDdlZjI5ZmJiOSIsImlhdCI6MTU2OTI0NTc2OH0.LbSkr0z1MhQhN5CJZTrc0GAD19ZJlDn-L3jIIWf1dPE', key, api)
.then(
  success => console.log(success),
  err     => console.log(err)
)

// { id: '5d88c9e9a9a6fe07ef29fbb9',
//   name: 'Igor M',
//   picture: 'https://gravatar.com/avatar/3a0783a28ee076b86376fb308d9e194d?d=identicon',
//   email: 'mail@garik.site',
//   createdAt: '2019-09-23T13:34:33.754Z'
// }

```
``` javascript

// ADD DATA:

Api.add('tests', { text: '123' }, key, api)
.then(
  success => console.log(success),
  err     => console.log(err)
)

// {
//   "id":"5d88cdd4a9a6fe07ef29fbba",
//   "text":"123",
//   "createdAt":"2019-09-23T13:51:16.341Z",
//   "updatedAt":"2019-09-23T13:51:16.341Z"
// }

```
``` javascript

// GET DATA:

Api.get('tests', { id: '5d88cdd4a9a6fe07ef29fbba', text: '123' }, key, api)
.then(
  success => console.log(success),
  err     => console.log(err)
)

// [
//   {
//     id: '5d88cdd4a9a6fe07ef29fbba',
//     text: '123',
//     createdAt: '2019-09-23T13:51:16.341Z',
//     updatedAt: '2019-09-23T13:51:16.341Z'
//   }
// ]

```
