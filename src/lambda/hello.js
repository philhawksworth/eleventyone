

export function handler(event, context, callback) {

  // grab the parameters from the request
  const params = event.queryStringParameters;

  // Report back to our logs
  console.log(`You called the Lambda function with all of these parameters: ${JSON.stringify(params)}`);

  // send a response
  return callback(null, {
    statusCode: 200,
    body: `Hello from the serverless function. Called with these parameters: ${JSON.stringify(params)}`
  });

};
