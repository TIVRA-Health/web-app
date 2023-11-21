
const saveUserConfigModel = require('../models/saveUserConfigModel');
console.log("device", saveUserConfigModel)
var saveUserConfig = (req, res, next) => {
  console.log("req", req.body)
  // req.check('name','Invalid name').notEmpty();
  // req.check('age','Invalid Email Address').notEmpty();
  
  var errors = false
  if(errors) {
    res.status(400).json({
      success : false,
      message : 'Invalid inputs',
      errors : errors
    })
  }
  else {
    var name = req.body.name;
    var age = req.body.age;
    
    var tempdata = new saveUserConfigModel(
        {
            "userid": req.body.userid,
            "health": {
                "heartrate": req.body.health.heartrate,
                "hrv": req.body.health.hrv,
                "sleep": req.body.health.sleep,
                "bp": req.body.health.bp,
                "temperature": req.body.health.temperature,
                "menstrualcycle": req.body.health.menstrualcycle,
                "vo2max": req.body.health.vo2max,
                "bloodglucoselevel": req.body.health.bloodglucoselevel,
                "bodyBattery": req.body.health.bodyBattery,
                "restingheartrate": req.body.health.restingheartrate
            },
            "fitness": {
                "stepscount": req.body.fitness.stepscount,
                "running": req.body.fitness.running,
                "respiration": req.body.fitness.respiration,
                "stairs": req.body.fitness.stairs,
                "pulse": req.body.fitness.pulse,
                "stress": req.body.fitness.stress,
                "calories": req.body.fitness.calories,
                "weight": req.body.fitness.weight,
                "trainingLoad": req.body.fitness.trainingLoad,
                "activities": req.body.fitness.activities,
                "gps": req.body.fitness.gps,
                "distance": req.body.fitness.distance
            }
        }
    )
    tempdata.save()
    .then(()=>{
      res.json({
        success : true,
        message : 'User configuaration saved successfully!'
      })
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).json({
        success : false,
        message : "Unable to user configuration Details"
      })
    })
  }
}
  


module.exports =  {saveUserConfig };
