# API ❤ AMG

``` Javascript

/////////////////////////////////////////////////////////////////


// INSTALL AMG

npm install api-amg --save
npm install -g yo
npm install -g generator-rest


// install mongodb

https://docs.mongodb.com/manual/installation/


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
