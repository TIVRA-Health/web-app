var mongoose = require("mongoose");
var config = require('config');
//const adminService = require("../services/admin");


//database connection
mongoose.Promise = global.Promise;
let options = {
  authSource: "admin"
};

// if(process.env.NODE_ENV==="docker") {
//   options.authSource = config.get('mongodb.authDB')
// }
console.log("conn", config.get('mongodb.connectionString'));
mongoose.connect(config.get('mongodb.connectionString'),{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected to mongoDB");
    //adminService.addAdminIfNotFound();
    
}).catch((err)=>{
    console.log("Error connecting to database",err);
})


module.exports=mongoose;