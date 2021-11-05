const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidator = (req, res = response, next) => {
  const valResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        params: error.param,
        msg: error.msg,
      };
    },
  });

  const errors = valResult(req).array();

  if (!(Object.entries(errors).length === 0)) {
    let preMsg = '';
    if (Object.entries(errors).length > 1) {
      preMsg = 'Ocurrieron los siguientes errores: ';
    }

    const msgErrors = errors.map((error) => {
      return `${error.params} ${error.msg}`;
    });
    const msg = `${preMsg}${msgErrors.join(' y ')}`;

    return res.json({
      ok: false,
      msg,
    });
  }

  next();
};

module.exports = {
  fieldsValidator,
};
