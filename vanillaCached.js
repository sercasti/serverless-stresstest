console.log('Loading function');

exports.handler = async (event, context, callback) => {
    return {"statusCode": 200,"body": JSON.stringify({"message": "Hello World APIG Cached!"})};
};