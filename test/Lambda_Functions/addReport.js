// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


exports.handler = async (event) => {
    
    try{
        let eventBuffer = JSON.parse('{"TableName": "Report", "Item":' + JSON.stringify(event.Item) +'}');
        
        await ddb.put(eventBuffer).promise();
        
        //console.log("test put");
        let response = {
                "statusCode": 200,
                "body": "Success"
        };
        
        
        return response;  
    }
    
    catch(exception){
        console.error(exception);
        const response = {
        "statusCode": 500,
        "body": exception
        }
        return response;
    }
    //return response;
    
};