console.log('Loading function');

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

var putParams = {
    TableName: "OnDemandTableTest",
    Item:{
        "userId": "userId",
        "noteId": "noteId",
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

var getParams = {
    TableName: "OnDemandTableTest",
    Key:{
        "userId": "userId",
        "noteId": "noteId"
    }
};

var queryParams = {
    TableName : "OnDemandTableTest",
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames:{
        "#userId": "userId"
    },
    ExpressionAttributeValues: {
        ":userId": "userId"
    }
};

exports.handler = async (event, context, callback) => {
    docClient.put(putParams, function(err, data) {});
    docClient.get(getParams, function(err, data) {});
    docClient.query(queryParams, function(err, data) {
        data.Items.forEach(function(item) {});
    });

    return {"statusCode": 200,"body": JSON.stringify({"message": "Hello World Dynamo On Demand!"})};
};