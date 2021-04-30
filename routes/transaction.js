const router = require('express').Router();
const { jwtValidator } = require('../middlewares/jwt-validator');
const { createTransaction, getNextNumberTransaction, updateNumberTransaction } = require('../controllers/transaction');

router.use(jwtValidator);
router.post('/transaction', createTransaction);
router.get('/lastTransaction', getNextNumberTransaction);
router.patch('/nextTransaction', updateNumberTransaction);

module.exports = router;
