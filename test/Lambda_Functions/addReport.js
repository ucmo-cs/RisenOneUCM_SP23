// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


exports.handler = async (event) => {
    let response;

    try{
        let eventtest = JSON.parse(event.body);
        
        const eventBuffer = {
            "TableName": "Report",
            "Item": {
                "id": event.headers.id,
                "account_id": event.headers.account_id,
                "date": eventtest.Item.date,
                "report_status": eventtest.Item.report_status,
                "projects": eventtest.Item.projects,
                "project_text": eventtest.Item.project_text,
            },
        };
        
        
        
        await ddb.put(eventBuffer).promise();
        
        //console.log("test put");
        response = {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": "Success"
        };
    }
    
    catch(exception){
        //console.error(exception);
        response = {
            "statusCode": 500,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": JSON.stringify({"Message": exception})
        };
    }
    
    return response; 
};