const jwt = require('jsonwebtoken')
const secret = process.env.secret
// console.log(secret,'<-env secret');

const createToken = (payload)=> jwt.sign(payload, secret)
const compareToken = (token) => jwt.verify(token, secret)

module.exports = {
    createToken,
    compareToken
}