var express = require('express');
var router = express.Router();

var deviceRegService = require('../services/deviceRegDetails');

router.post('/',deviceRegService.deviceReg);

module.exports = router;