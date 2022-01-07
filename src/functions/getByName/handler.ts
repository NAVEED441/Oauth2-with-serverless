import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
// import token from "@functions/hello/handler";
//

const axios = require("axios");
const getByname: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { token } = event.pathParameters;
  console.log("============================");
  console.log({ token });
  console.log("============================");
  const response = await axios.get(
    "https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365207026120/query?query= select * from Account where Name > 'naveedkha123'&minorversion=62",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(token);
  return formatJSONResponse({
    message: response.data,
  });
};

export const main = middyfy(getByname);
