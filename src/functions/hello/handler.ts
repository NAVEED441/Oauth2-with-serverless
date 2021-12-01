import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
// import OAuthClient from "intuit-oauth";
import { o } from "@functions/aouth";
import schema from "./schema";
import * as AWS from "aws-sdk";

const retrieveToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // var oauth = new OAuthClient();
  const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "localhost",

    endpoint: "http://localhost:8000",
  });
  const data = {
    TableName: "NaveedTable",
  };
  const Item = await dynamo.scan(data).promise();
  console.log(
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  console.log(Item.Items);
  console.log(
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  const redirectUri = `/createtoken?code=${Item.Items[0].code}&state=${Item.Items[0].state}&realmId=${Item.Items[0].realmId}`;
  console.log(
    `/createtoken?code=${Item.Items[0].Code}&state=${Item.Items[0].state}&realmId=${Item.Items[0].realmId}`
  );
  const result = await o.createToken(redirectUri);
  const token = result.getJson();
  return formatJSONResponse({
    message: "token created",
    body: token,
  });
};

export const main = middyfy(retrieveToken);
