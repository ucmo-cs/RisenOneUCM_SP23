// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

let eventBuffer = {
    "TableName": "Report",
    "Key": "",
    //"Item": "",
    "UpdateExpression": "",
    "ExpressionAttributeValues": ""
}; 

exports.handler = async (event) => {
    let response;
    let bufferKey;
    let data = JSON.parse(event.body);
    try{
        let itemkeyBuffer = event.headers.id;
        let accountkeyBuffer = event.headers.account_id;
        //requires primary key and sort key fields to work
        bufferKey = {
            "id":itemkeyBuffer,
            "account_id": accountkeyBuffer
        };
        // eventBuffer.Item = {
        //     "id": event.headers.id,
        //     "account_id": event.headers.account_id,
        //     "date": event.body.date,
        //     "report_status": event.body.report_status,
        //     "projects": event.body.projects,
        //     "project_text": event.body.project_text,
        // };
        eventBuffer.Key = bufferKey;
      
        eventBuffer.ExpressionAttributeValues = {
            ":r" : data.project_text,
            ":n" : data.report_status
        };
        eventBuffer.UpdateExpression = "SET project_text = :r, report_status = :n ";
        console.log(event.body);
        console.log(event.body.report_status);
        console.log(event.body.project_text);
        console.log(data.report_status);
        console.log(data.project_text);
        console.log(eventBuffer.ExpressionAttributeValues);
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