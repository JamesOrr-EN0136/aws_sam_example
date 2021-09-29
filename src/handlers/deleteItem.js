const AWS = require("aws-sdk");
AWS.config.update({ region:  "eu-west-1" });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.SAMPLE_TABLE

exports.deleteItemHandler = async(event) => {

    // TODO implement
    let result = 500;
    result = await deleteRow(tableName, event);
    let response;


    if (result !== 0) {
        response = {
            statusCode: 200,
            body: "successfully deleted row"
        };
    }
    else {
        response = {
            statusCode: 404,
            body: "failed to deleted row",
        };
    }
    return response;




}

async function deleteRow(tableName, event) {
    try {
        let paramsForQuery = {
            TableName: tableName,
            Key: {
                Id: event.pathParameters.id
            }
        };
        let result = await dynamodb.delete(paramsForQuery).promise();
        return result;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}
