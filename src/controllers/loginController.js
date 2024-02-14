const HelloWorld = async (request, reply) => {
  reply.code(200).send({ message: 'Hello, YOK!' });
}
const authLine = async (request, reply) => {
  const { LINE_CHANNEL_ID, LINE_CALLBACK_URL } = process.env;
  const state = Math.random().toString(36).substring(7);
  const redirectUri = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CHANNEL_ID}&redirect_uri=${LINE_CALLBACK_URL}&state=${state}&scope=profile`;
  reply.code(302).send({ redirectUri });
}
const authLineCallback = async (request, reply) => {
    const { code } = request.query;
  try {
    const { LINE_CHANNEL_ID, LINE_CHANNEL_SECRET, LINE_CALLBACK_URL } = process.env;
    const response = await axios.post('https://api.line.me/oauth2/v2.1/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: LINE_CALLBACK_URL,
      client_id: LINE_CHANNEL_ID,
      client_secret: LINE_CHANNEL_SECRET,
    });
    const { access_token } = response.data;
    const profile = await axios.get('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    reply.send({ accessToken: access_token, profile: profile.data });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

module.exports = {
    authLine,
    authLineCallback,
    HelloWorld
}