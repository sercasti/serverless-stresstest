const https = require('https')

exports.handler = async (event, context, callback) => {
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
  return {"statusCode": 200,"body": JSON.stringify({"message": "Hello World Vanilla with latency!"})};
};
