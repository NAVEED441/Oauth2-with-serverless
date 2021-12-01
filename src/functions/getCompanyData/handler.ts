import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
const axios = require("axios");
const getCompanydata: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
    const response = await axios.get(
      "https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365207026120/account/93?minorversion=62",
      {
        headers: {
          Authorization:
            "Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ldVcE0ABYmAsi67EnrgqYw.2-Zv21NsMOZC1_pq4LofzFBQbMM48PV_xFr3mro_AeDepAzwYI23p57lz0at6vSfGt4LUce42TOjobYcSQ-C1s-qi0YBXLNh-IaK5g0aZLWr0eQK7zeINTxvbfd5msAqNcFGpqI1sis0nbTAuO9rBrmoB2v_x5LksXqcQV64SjDVH8W1qvAP2rUi8AQXYZbtMarZBhkU2KaMO1zPvn9h_ZKhBGQ4e-W_wmwDvrDd4vo9aEtz7rWVMvrGGwDpe2Qht1S8uDzvv_S6j-5VLgumPIl8IEuxvb4QccwdmCt4tPH3J8Wzy2DYB3pJ7hU0c-sytZDDJwfmZmK4tIBJPL15s2B8q8ohA5i8EeT2Aj3ggJFQ6akVCULk0Sahv2xNLqyIItjPo2jlGGAdubnDoj7pniTfxbB15PJpUPfWcmZ-2tyE5zXNuGnkkemi7NDsr35FKb0tSr5MCVYSXB8M7e9hQEj0VgBMRUfNIg4f7e_MgUsbO1ow7Fw-9aID-Zm14lBn1tX6rHEn1jtHb5nKod9OJK9-kQ6dCN1UUFjuVwNg5QA5RoltX4sH8gfyxu88UXif-Jl4HgAGCGdCfiM9hmV51C2b9F5XpI4wk42VQ6zG-Ln26QzKkoXSoYNWcap9Ip9wCJ-pg9G4_6T4fRPgckuJ69nGMSSmtUWdjNiuX3fHvnUccPiwv6nnhB7XwHJIILbnDS_3EB-KEurLTlfJnPSisle4D2qqzmVQz_JnXVu9Npk8B30yZeDMBhgsQP0GjAB0.Qg3SB9Ng45Na7i5mZKpdyg",
        },
      }
    );
    console.log(response);
    return formatJSONResponse({
      message: response.data,
    });
  };

export const main = middyfy(getCompanydata);
