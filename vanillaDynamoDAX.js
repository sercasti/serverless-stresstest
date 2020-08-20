const AWS = require('aws-sdk');
const AmazonDaxClient = require('amazon-dax-client');
var daxClient = null;


var putParams = {
    TableName: "OnDemandTableTest",
    Item:{
        "userId": "userIdDAX",
        "noteId": "noteIdDAX",
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

var getParams = {
    TableName: "OnDemandTableTest",
    Key:{
        "userId": "userIdDAX",
        "noteId": "userIdDAX"
    }
};

var queryParams = {
    TableName : "OnDemandTableTest",
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames:{
        "#userId": "userId"
    },
    ExpressionAttributeValues: {
        ":userId": "userIdDAX"
    }
};

exports.handler = async (event, context, callback) => {
  var dax = new AmazonDaxClient({endpoints: [process.env.DAX_ENDPOINT]})
  daxClient = new AWS.DynamoDB.DocumentClient({service: dax });
  daxClient.put(putParams, function(err, data) {});
  daxClient.get(getParams, function(err, data) {});
  daxClient.query(queryParams, function(err, data) {
      data.Items.forEach(function(item) {});
  });

  return {"statusCode": 200,"body": JSON.stringify({"message": "Hello World Dynamo DAX!"})};
};