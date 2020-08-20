const serverless = require('serverless-http');
const express = require('express')
const app = express()
const https = require('https')

app.get('/goldenhwlat', function (req, res) {
  res.send('Hello World with Latency!')
})

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const response = await new Promise((resolve, reject) => {
    const req = https.get("https://postman-echo.com/delay/2", function(res) {
      res.on('data', chunk => {
      });
      res.on('end', () => {
        resolve({
            statusCode: 200,
            body: JSON.stringify({"message": "Hello World!"})
        });
      });
    });
  });
  return await handler(event, context);
};