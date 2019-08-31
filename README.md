# yo generator-rest

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
