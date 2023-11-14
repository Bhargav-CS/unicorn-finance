const axios = require('axios');

const {
  CLIENT_ID, CLIENT_SECRET, TOKEN_HOST, TOKEN_PATH, SCOPE,
} = process.env;

const config = {
  client: {
    id: CLIENT_ID,
    secret:
      CLIENT_SECRET,
  },
  auth: {
    tokenHost: TOKEN_HOST,
    tokenPath: TOKEN_PATH,
  },
};

const { ClientCredentials } = require('simple-oauth2');

const client = new ClientCredentials(config);

const tokenParams = {
  scope: SCOPE,
};

async function generateAccessToken() {
  try {
    return await client.getToken(tokenParams);
  } catch (error) {
    console.error('Error gathering access token: ', error.message);
  }
  return undefined;
}

const gatherAccessToken = async () => {
  try {
    const response = await generateAccessToken();
    console.log(response);
    return response.token.access_token;
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

module.exports = { gatherAccessToken };
