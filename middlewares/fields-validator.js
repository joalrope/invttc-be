const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidator = (req, res = response, next) => {
  //Manejo de errores
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
    if (Object.entries(errors).length > 1) {
      var preMsg = 'Ocurrieron los siguientes errores:';
    }

    const msgErrors = errors.map((error) => {
      return `${!!preMsg ? preMsg : ''} ${error.params} ${error.msg}`;
    });

    return res.status(400).json({
      ok: false,
      msg: msgErrors.join(),
    });
  }

  next();
};

module.exports = {
  fieldsValidator,
};
