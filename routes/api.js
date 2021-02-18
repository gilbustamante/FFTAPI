const express = require('express');
const api     = require('../controllers/api');
const router  = express.Router();

router.route('/')
  .get(api.allEndpoints)

router.route('/item')
  .get(api.allItems)

router.route('/item/:query')
  .get(api.oneItem)

module.exports = router;