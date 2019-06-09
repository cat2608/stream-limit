const isValidPayload = (payload, requiredParams) => {
  const paramsKey = Object.keys(payload);
  return requiredParams.every(p => paramsKey.indexOf(p) !== -1);
};

module.exports = isValidPayload;
