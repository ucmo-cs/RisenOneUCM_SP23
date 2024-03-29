var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const tableName = "Report";
exports.handler = async event => {
    console.log("Received: " + JSON.stringify(event, null, 2));
    let response = "";

    try {
        const params = {
            TableName: tableName,
            Key: {
                id: event.headers.id,
                account_id: event.headers.account_id,
            },
        };

        const report = await documentClient.get(params).promise();

        response = {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": JSON.stringify(report),
        };
    } catch (exception) {
        console.error(exception);
        response = {
            "statusCode": 500,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": JSON.stringify({"Message": exception}),
        };
    }

    return response;
};
