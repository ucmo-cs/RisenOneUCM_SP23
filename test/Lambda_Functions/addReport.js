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
            "Item": {
                "id": event.headers.id,
                "account_id": event.headers.account_id,
                "date": event.body.date,
                "report_status": event.body.report_status,
                "projects": event.body.projects,
                "project_text": event.body.project_text,
            },
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