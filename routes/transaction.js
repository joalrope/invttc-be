const router = require('express').Router();
const { createTransaction, getNextNumberTransaction, updateNumberTransaction } = require('../controllers/transaction');

router.post('/transaction', createTransaction);
router.get('/lastTransaction', getNextNumberTransaction);
router.patch('/nextTransaction', updateNumberTransaction);

module.exports = router;
