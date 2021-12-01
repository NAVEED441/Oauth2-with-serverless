// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";

import { middyfy } from "@libs/lambda";
const OAuthClient = require("intuit-oauth");

import { Handler } from "aws-lambda";
import { o } from "@functions/aouth";

const auther: Handler = async (event, context, callback) => {
  const authUri = o.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: "intuit-test",
  });
  const response = {
    statusCode: 301,

    headers: {
      Location: authUri,
    },
  };
  return callback(null, response);
};

export const main = middyfy(auther);
