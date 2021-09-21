const router = require('express').Router();
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  createBilling,
  getBillingInfo,
  updateBillingInfo,
} = require('../controllers/billing');

router.use(jwtValidator);
router.post('/', createBilling);
router.get('/getBilling', getBillingInfo);
router.patch('/nextBilling', updateBillingInfo);

module.exports = router;
