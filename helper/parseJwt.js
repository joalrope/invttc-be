const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const buff = Buffer.from(base64, 'base64');
  const { role } = JSON.parse(buff.toString('utf-8'));

  return role;
};

module.exports = {
  parseJwt,
};
