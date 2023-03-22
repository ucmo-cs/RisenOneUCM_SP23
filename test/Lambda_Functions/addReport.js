// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


exports.handler = async (event) => {
    let response;
    try{
        let eventBuffer = JSON.parse('{"TableName": "Report", "Item":' + JSON.stringify(event.Item) +'}');
        
        await ddb.put(eventBuffer).promise();
        
        //console.log("test put");
        response = JSON.stringify(JSON.parse('{"statusCode": 200,"body": "Success"}'));
    }
    
    catch(exception){
        //console.error(exception);
        response = JSON.stringify(JSON.parse('{"statusCode": 500,"body": ${exception}'));
    }
    
    return response; 
};