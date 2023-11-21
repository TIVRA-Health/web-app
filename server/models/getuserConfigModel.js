const mongoose = require('mongoose');

const getUserConfigSchema = require('../schemas/saveUserConfigSchema');
var getUserConfigModel = mongoose.model('saveuserconfigurations', getUserConfigSchema)

module.exports= getUserConfigModel;