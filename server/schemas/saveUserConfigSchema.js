
var mongoose = require("mongoose");

var saveUserConfigSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  health: {
    heartrate: {
      type: String,
      required: false
    },
    hrv: {
      type: String,
      required: false
    },
    sleep: {
      type: String,
      required: false
    },
    bp: {
      type: String,
      required: false
    },
    temperature: {
      type: String,
      required: false
    },
    menstrualcycle: {
      type: String,
      required: false
    },
    vo2Max: {
      type: String,
      required: false
    },
    bloodglucoselevel: {
      type: String,
      required: false
    },
    bodybattery: {
      type: String,
      required: false
    },
    restingheartrate: {
      type: String,
      required: false
    }
  },
  fitness: {
    stepscount: {
      type: String,
      required: false
    },
    running: {
      type: String,
      required: false
    },
    respiration: {
      type: String,
      required: false
    },
    stairs: {
      type: String,
      required: false
    },
    pulse: {
      type: String,
      required: false
    },
    stress: {
      type: String,
      required: false
    },
    calories: {
      type: String,
      required: false
    },
    weight: {
      type: String,
      required: false
    },
    trainingload: {
      type: String,
      required: false
    },
    activities: {
      type: String,
      required: false
    },
    gps: {
      type: String,
      required: false
    },
    distance: {
      type: String,
      required: false
    }
  }
 
 
}, {
  timestamps: {}
})

module.exports = saveUserConfigSchema