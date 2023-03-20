// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    //return event;
    //var response;
    try{
        
        await ddb.put(event).promise();
        
        //console.log("test put");
        const response = {
                "statusCode": 200,
                "body": "Success"
        };
        return response;
        //console.log(data);   
    
            
    }
    catch(exception){
        console.error(exception);
        const response = {
        "statusCode": 500,
        "body": JSON.stringify(exception)
        }
        return response;
    }
    //return response;
    
};