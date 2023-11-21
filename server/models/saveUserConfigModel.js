var mongoose = require('mongoose');
var saveUserConfigSchema = require('../schemas/saveUserConfigSchema');

var saveUserConfigModel = mongoose.model('saveuserconfiguration', saveUserConfigSchema);

module.exports = saveUserConfigModel;