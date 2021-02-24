const express    = require('express');
const api        = require('../controllers/api');
const catchAsync = require('../utils/catchAsync');
const router     = express.Router();

// Root
router.route('/')
  .get(catchAsync(api.allEndpoints))

// Accessories
router.route('/accessories')
  .get(catchAsync(api.allAccessories))
router.route('/accessories/random')
  .get(catchAsync(api.randomAccessory))
router.route('/accessories/:query')
  .get(catchAsync(api.oneAccessory))

// Armor
router.route('/armors')
  .get(catchAsync(api.allArmor))
router.route('/armors/random')
  .get(catchAsync(api.randomArmor))
router.route('/armors/:query')
  .get(catchAsync(api.oneArmor))

// Helmets
router.route('/helmets')
  .get(catchAsync(api.allHelmets))
router.route('/helmets/random')
  .get(catchAsync(api.randomHelmet))
router.route('/helmets/:query')
  .get(catchAsync(api.oneHelmet))

// Items
router.route('/items')
  .get(catchAsync(api.allItems))
router.route('/items/random')
  .get(catchAsync(api.randomItem))
router.route('/items/:query')
  .get(catchAsync(api.oneItem))

// Weapons
router.route('/weapons')
  .get(catchAsync(api.allWeapons))
router.route('/weapons/random')
  .get(catchAsync(api.randomWeapon))
router.route('/weapons/:query')
  .get(catchAsync(api.oneWeapon))

module.exports = router;