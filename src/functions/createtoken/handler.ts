import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
// import OAuthClient from "intuit-oauth";
import * as AWS from "aws-sdk";
import schema from "./schema";
import { o } from "@functions/aouth";

const createtoken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const authCode = event.queryStringParameters.code;

  const path = event.path;

  const realmId = event.queryStringParameters.realmId;

  const state = event.queryStringParameters.state;

  console.log(state, path, realmId, authCode);

  const redirectUri = `http://localhost:3000/dev/createtoken/${path}?code=${authCode}&state=${state}&realmId=${realmId}`;
  console.log(redirectUri);

  // const token = await o
  //   .createToken(redirectUri)
  //   .then(function (authResponse) {
  //     console.log(
  //       "The Token is  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" +
  //         JSON.stringify(authResponse.getJson())
  //     );
  //   })
  //   .catch(function (e) {
  //     console.error("The error message is :" + e.originalMessage);
  //     console.error(e.intuit_tid);
  //   });

  const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "localhost",

    endpoint: "http://localhost:8000",
  });

  await dynamo
    .put({
      TableName: "NaveedTable",
      Item: {
        realmId: event.queryStringParameters.realmId,
        code: event.queryStringParameters.code,
        state: event.queryStringParameters.state,
      },
    })
    .promise();

  return formatJSONResponse({
    message: "token created",
  });

  // var oauth = new OAuthClient();
  // oauth.createToken()
  // oauth.createToken(event.path).then(function (authResponse) {
  //   const oauth2_token_json2 = JSON.stringify(authResponse.getJson(), null, 2);
  //   console.log(oauth2_token_json2);
  // saveOuth(oauth2_token_json2);
  // return formatJSONResponse({
  //   message: "token created",
  //   body: oauth2_token_json,
  // });
  // });
};
export const main = middyfy(createtoken);
