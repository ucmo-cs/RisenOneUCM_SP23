// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


exports.handler = async (event) => {
    let response;
    try{
        const eventBuffer = {
            "TableName": "Report",
            "Item": JSON.parse(event.body)
        };
        
        await ddb.put(eventBuffer).promise();
        
        //console.log("test put");
        response = {
            "statusCode": 200,
            "body": "Success"
        };
    }
    
    catch(exception){
        //console.error(exception);
        response = {
            "statusCode": 500,
            "body": JSON.stringify(exception)
        };
    }
    
    return response; 
};