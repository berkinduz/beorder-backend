const jwt = require('jsonwebtoken');
const userLogin = require('../queries/users');

let decoded = jwt.verify(userLogin.token, 'asd');
console.log(decoded.foo)