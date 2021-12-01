import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import autheraization from "@functions/autheraization";
import createtoken from "@functions/createtoken";
import createdata from "@functions/createdata";
import getCompanyData from "@functions/getCompanyData";

const serverlessConfiguration: AWS = {
  service: "aws-type-outh",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },

  resources: {
    Resources: {
      TypesciptTable: {
        Type: "AWS::DynamoDB::Table",

        Properties: {
          TableName: "NaveedTable",

          AttributeDefinitions: [
            { AttributeName: "realmId", AttributeType: "S" },
          ],

          KeySchema: [{ AttributeName: "realmId", KeyType: "HASH" }],

          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
  // import the function via paths

  functions: { autheraization, hello, createdata, createtoken, getCompanyData },
};

module.exports = serverlessConfiguration;
