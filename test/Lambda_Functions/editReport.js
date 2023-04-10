// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

let eventBuffer = {TableName: "Report",Item:"", UpdateExpression: '', ExpressionAttributeValues: ''}; 

exports.handler = async (event) => {
    let response;
    let bufferKey;
    try{
        let itemkeyBuffer = event.Item.id;
        let accountkeyBuffer = event.Item.account_id;
        //requires primary key and sort key fields to work
        bufferKey = { "id":itemkeyBuffer,"account_id": accountkeyBuffer};
        eventBuffer.Item = event.Item;
        eventBuffer.Key = bufferKey;
      
        
        eventBuffer.UpdateExpression = "set project_text = :r, report_status = :n ";
        eventBuffer.ExpressionAttributeValues = {":r" : event.Item.project_text, ":n" : event.Item.report_status};
        
        await ddb.update(eventBuffer).promise();
        
        
        response = {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": "success"
        };
    }
    
    catch(exception){
        response = {
            "statusCode": 500,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body" : JSON.stringify({"Message": exception})
        };
    }
    
    return response; 
};