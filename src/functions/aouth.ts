const OAuthClient = require("intuit-oauth");
const o = new OAuthClient({
  clientId: "ABCg218iSc0BHOALA3roY1P6O3VeOhf0FSHCVuP62e18mFdGXy",
  clientSecret: "XcEqXBp2yJkqJfUzOWL423y5FZPfy2SatlsFrAZV",
  environment: "sandbox",
  redirectUri: "http://localhost:3000/dev/createtoken",
});

export { o };
