const express    = require('express');
const api        = require('../controllers/api');
const catchAsync = require('../utils/catchAsync');
const router     = express.Router();

router.route('/')
  .get(catchAsync(api.allEndpoints))

router.route('/item')
  .get(catchAsync(api.allItems))

router.route('/item/:query')
  .get(catchAsync(api.oneItem))

router.route('/armor')
  .get(catchAsync(api.allArmor))

router.route('/armor/:query')
  .get(catchAsync(api.oneArmor))

router.route('/helmet')
  .get(catchAsync(api.allHelmets))

router.route('/helmet/:query')
  .get(catchAsync(api.oneHelmet))

router.route('/weapon')
  .get(catchAsync(api.allWeapons))

router.route('/weapon/:query')
  .get(catchAsync(api.oneWeapon))

router.route('/accessory')
  .get(catchAsync(api.allAccessories))

router.route('/accessory/:query')
  .get(catchAsync(api.oneAccessory))

module.exports = router;