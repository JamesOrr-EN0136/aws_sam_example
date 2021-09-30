// Import all functions from get-all-items.js 
const lambda = require('../../../src/handlers/get-all-items.js');
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb');

// This includes all tests for getAllItemsHandler() 
describe('Test getAllItemsHandler', () => {
    let scanSpy;

    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => {
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'scan');
    });

    // Clean up mocks 
    afterAll(() => {
        scanSpy.mockRestore();
    });

    it('should return ids', async() => {
        const items = [{
                "Id": "2",
                "sales": 570,
                "name": "Carl"
            },
            {
                "Id": "1",
                "sales": 1000,
                "name": "Samantha"
            },
            {
                "sales": 199,
                "Id": "6",
                "name": "Jacob"
            },
            {
                "sales": 99,
                "Id": "5",
                "name": "John"
            },
            {
                "sales": 281,
                "Id": "4",
                "name": "Ashley"
            },
            {
                "sales": 134,
                "Id": "7",
                "name": "george"
            },
            {
                "sales": 120,
                "Id": "3",
                "name": "harold"
            }
        ];

        // Return the specified value whenever the spied scan function is called 
        scanSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: items })
        });

        const event = {
            httpMethod: 'GET'
        }

        // Invoke helloFromLambdaHandler() 
        const result = await lambda.getAllItemsHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(items)
        };

        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult);
    });
});
