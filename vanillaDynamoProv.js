console.log('Loading function');

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

var putParams = {
    TableName: "ProvisionedTableTest",
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
    const response = await new Promise((resolve, reject) => {
        docClient.put(putParams, function(err, data) {});
        
        docClient.query(queryParams, function(err, data) {
            data.Items.forEach(function(item) {});
        });
        docClient.get(getParams, function(err, data) {
            resolve({
                statusCode: 200,
                body: JSON.stringify({"message": "Hello World!"})
            })
        });
    })
    return {"statusCode": 200,"body": JSON.stringify({"message": "Hello World Dynamo Provisioned!"})};
};