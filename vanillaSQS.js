console.log('Loading function');
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

 
exports.handler = async (event, context, callback) => {

    var accountId = context.invokedFunctionArn.split(":")[4];
    var queueUrl = 'https://sqs.us-east-1.amazonaws.com/' + accountId + '/SQSQueue';

    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
          "Title": {
            DataType: "String",
            StringValue: "The Whistler"
          },
          "Author": {
            DataType: "String",
            StringValue: "John Grisham"
          },
          "WeeksOn": {
            DataType: "Number",
            StringValue: "6"
          }
        },
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        QueueUrl: queueUrl
      };

    sqs.sendMessage(params, function(err, data) {
    });
    return {"statusCode": 200,"body": JSON.stringify({"message": "Hello World SQS!"})};
};