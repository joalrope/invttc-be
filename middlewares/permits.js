const permits = (app) => {
  app.get('*', async (req, res, next) => {
    const token = req.header('x-token');
    let role;

    if (token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');

      const buff = Buffer.from(base64, 'base64');

      const { role: rol } = JSON.parse(buff.toString('utf-8'));
      role = rol;
    }

    console.log('role:', role);
    if (!role === 'basic') {
      console.log('POST happen', role);
      next();
    }
    next();
  });
};

module.exports = {
  permits,
};
