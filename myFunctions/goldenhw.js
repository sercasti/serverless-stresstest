const serverless = require('serverless-http');
const express = require('express')
const app = express()
app.get('/goldenhw', function (req, res) {
  res.send('Hello World Golden Lambda!')
})
module.exports.handler = serverless(app);