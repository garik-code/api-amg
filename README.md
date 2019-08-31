# yo generator-rest

``` Javascript

/////////////////////////////////////////////////////////////////


// INSTALL YGR

npm i ygr --save


// install mongodb and see docs generator rest api:
// https://www.npmjs.com/package/generator-rest

npm install -g yo
npm install -g generator-rest


// generate a new project

yo rest


// generate a new api endpoint inside your project

yo rest:api


/////////////////////////////////////////////////////////////////

```

``` javascript

const Api = require('ygr')

```
``` javascript

// Auth user

Api.auth(email, passw, key, ip)
.then(
  success => console.log(success),
  err => console.log(err)
)

```

``` javascript

// Get data

Api.get('/type', 'a=b&c=d', key, ip)
.then(
  success => console.log(success),
  err => console.log(err)
)

```
