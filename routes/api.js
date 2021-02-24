const express    = require('express');
const api        = require('../controllers/api');
const catchAsync = require('../utils/catchAsync');
const router     = express.Router();

router.route('/')
  .get(catchAsync(api.allEndpoints))

router.route('/items')
  .get(catchAsync(api.allItems))

router.route('/items/:query')
  .get(catchAsync(api.oneItem))

router.route('/armors')
  .get(catchAsync(api.allArmor))

router.route('/armors/:query')
  .get(catchAsync(api.oneArmor))

router.route('/helmets')
  .get(catchAsync(api.allHelmets))

router.route('/helmets/:query')
  .get(catchAsync(api.oneHelmet))

router.route('/weapons')
  .get(catchAsync(api.allWeapons))

router.route('/weapons/:query')
  .get(catchAsync(api.oneWeapon))

router.route('/accessories')
  .get(catchAsync(api.allAccessories))

router.route('/accessories/:query')
  .get(catchAsync(api.oneAccessory))

module.exports = router;