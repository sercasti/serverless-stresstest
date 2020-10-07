const AWS = require('aws-sdk');
const AmazonDaxClient = require('amazon-dax-client');
var daxClient = null;

const putParams = {
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

const getParams = {
    TableName: "OnDemandTableTest",
    Key:{
        "userId": "userId",
        "noteId": "noteId"
    }
}

const params = {
    TableName : "OnDemandTableTest",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
        ":userId":"userId"
    }
}

exports.handler = async (event, context) => {
    var dax = new AmazonDaxClient({endpoints: [process.env.DAX_ENDPOINT]})
    daxClient = new AWS.DynamoDB.DocumentClient({service: dax });
    
    await new Promise((resolve, reject) => {
        daxClient.put(putParams, (err, data) => {
            resolve(data);
        });
    });
    
    await new Promise((resolve, reject) => {
        daxClient.query(params, (err, data) => {
            resolve(data);
        });
    });
    
    return await new Promise((resolve, reject) => {
        daxClient.get(getParams, (err, data) => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(data)
            })
        });
    })
};