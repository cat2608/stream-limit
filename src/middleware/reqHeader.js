const parseToJson = (token) => {
  const buff = Buffer.from(token, 'base64');
  return JSON.parse(buff.toString());
};

const extractAuth = (req) => {
  const { authorization } = req.headers;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    const [, b64Token] = authorization.split(' ');
    return parseToJson(b64Token);
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

module.exports = { extractAuth };
