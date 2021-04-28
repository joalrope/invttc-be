const permits = (app) => {
  app.post('*', async (req, res, next) => {
    const role = req.header('x-role');
    console.log('rol:', role);
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
