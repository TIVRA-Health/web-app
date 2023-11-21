var mongoose = require('mongoose');
var deviceRegSchema = require('../schemas/deviceregdetails');

var deviceRegModel = mongoose.model('deviceregistration', deviceRegSchema);

module.exports = deviceRegModel;