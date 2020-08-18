console.log('Loading function');

exports.handler = async (event, context, callback) => {
    callback(null, generatePolicy(event.methodArn));  
};

const generatePolicy = function(resource) {
    const authResponse = {};
    authResponse.principalId = 'user';
    if (resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = 'Allow';
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};