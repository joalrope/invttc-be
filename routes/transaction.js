const router = require('express').Router();
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  createTransaction,
  getTransactionInfo,
  updateTransactionInfo,
} = require('../controllers/transaction');

router.use(jwtValidator);
router.post('/transaction', createTransaction);
router.get('/getTransaction', getTransactionInfo);
router.patch('/nextTransaction', updateTransactionInfo);

module.exports = router;
