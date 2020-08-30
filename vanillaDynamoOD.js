const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

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
    await new Promise((resolve, reject) => {
        docClient.put(putParams, (err, data) => {
            resolve(data);
        });
    });

    await new Promise((resolve, reject) => {
        docClient.query(params, (err, data) => {
            resolve(data);
        });
    });
    
    return await new Promise((resolve, reject) => {
        docClient.get(getParams, (err, data) => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(data)
            })
        });
    })
};