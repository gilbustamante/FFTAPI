const express = require('express');
const api     = require('../controllers/api');
const router  = express.Router();

router.route('/')
  .get(api.allEndpoints)

module.exports = router;