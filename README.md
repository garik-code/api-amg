# yo generator-rest

``` Javascript
// See docs generator rest api: https://www.npmjs.com/package/generator-rest

npm install -g yo
npm install -g generator-rest

yo rest // generate a new project
yo rest:api // generate a new api endpoint inside your project

```
npm i ygr --save

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
