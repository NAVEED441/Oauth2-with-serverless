import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
const axios = require("axios");
const createdatda: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { token } = event.pathParameters;
  const { name, accountType } = event.body;
  const response = await axios.post(
    "https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365207026120/account?minorversion=62",
    {
      Name: name,
      AccountType: accountType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return formatJSONResponse({
    message: response.data,
  });
};

export const main = middyfy(createdatda);
