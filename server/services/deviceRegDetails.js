
const deviceRegModel = require('../models/deviceRegModel');
console.log("device", deviceRegModel)

var deviceReg = (req, res, next) => {
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
    
    var tempdata = new deviceRegModel(
      {
        "firstname": req.body.firstname,
       "middlename": req.body.middlename,
       "lastname": req.body.lastname,
       "email": req.body.email,
       "phonenumber": req.body.phonenumber,
       "password": req.body.password,
       "paymentstatus": req.body.paymentstatus,
       "profileplan": req.body.profileplan,
       "gender": req.body.gender,
       "dateofbirth": req.body.dateofbirth,
       "address1": req.body.address1,
       "address2": req.body.address2,
       "city": req.body.city,
       "state": req.body.state,
       "zipcode": req.body.zipcode,
       "country": req.body.country,
       "education": req.body.education,
       "householdincome": req.body.householdincome,
       "healthcareflag": req.body.healthcareflag,
       "hospitalsystem": req.body.hospitalsystem,
       "height": req.body.height,
       "weight": req.body.weight,
       "chroniccondition": req.body.chroniccondition,
       "smokerflag": req.body.smokerflag,
       "deviceid": req.body.deviceid,
       "devicename": req.body.devicename
   }
    )
    tempdata.save()
    .then(()=>{
      res.json({
        success : true,
        message : 'Device registered successfully!'
      })
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).json({
        success : false,
        message : "Unable to register Device, Please fill all mandatory fields"
      })
    })
  }
}
  

module.exports =  {deviceReg };