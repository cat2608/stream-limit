const isValidToken = (token) => {
  const requiredParams = ['email'];
  const auth = Object.keys(token);
  return requiredParams.every(p => auth.indexOf(p) !== -1);
};

module.exports = isValidToken;
