var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = "Report";
exports.handler = async event => {
    // TODO implement
    console.log("Received: " + JSON.stringify(event, null, 2));
    let response = "";
    
    try {
        var params = {
          TableName : tableName,
          FilterExpression : 'account_id = :the_account_id',
          ExpressionAttributeValues : {
            ':the_account_id' : event.headers.account_id
          },
        };
        
        const reports = await documentClient.scan(params).promise();
        
        response = {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": JSON.stringify(reports),
        };       
        
    } catch (exception) {
        console.error(exception);
        response = {
            "statusCode": 500,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": JSON.stringify({"Message: " : exception}),
        };
    }
    
    return response;
};
