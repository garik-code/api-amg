# API ❤ AMG

``` Javascript

/////////////////////////////////////////////////////////////////


// INSTALL AMG

npm install api-amg --save


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

const Api = require('api-amg')

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

// Add data

Api.add('name', 'a=b&c=d', key, ip)
.then(
  success => console.log(success),
  err => console.log(err)
)

```

``` javascript

// Get data

Api.get('name', 'a=b&c=d', key, ip)
.then(
  success => console.log(success),
  err => console.log(err)
)

```

``` javascript

// Update data

Api.update(id, 'name', 'a=b&c=d', key, ip)
.then(
  success => console.log(success),
  err => console.log(err)
)

```
