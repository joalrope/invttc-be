const router = require('express').Router();
const { createInvoices, getNextNumberInvoice } = require('../controllers/Invoices');

router.post('/invoice', createInvoices);
router.get('/lastInvoice', getNextNumberInvoice);

module.exports = router;
