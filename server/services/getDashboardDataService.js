
const saveUserConfigModel = require('../models/saveUserConfigModel');

var getDashboardData = (req, res, next) => {

saveUserConfigModel.aggregate(
    [
      {$match:{userid:req.query.userid}}
    ]
  )
  .then(
    (result)=>{
      console.log(typeof(result[0]));
      if (result.length>0){
    console.log("ressss", result.length);
    delete result[0]._id;
    delete result[0].createdAt;
    delete result[0].updatedAt;
    delete result[0].__v;
   res.json({
    message: "success",
    userData: result[0]
   }
   )
    }
    else{
      res.json(
        {
          message: "User Data not found",
          status: "failed"
        }
      )
    }
  })
  .catch((err)=>{
    console.log("err",err)
    res.status(500).json({
      success:false,
      message:'Internal Server Error'
    })
  })
}

module.exports = {getDashboardData}; 


