var mongoose = require("mongoose");

var deviceRegSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: false,
    },
    middlename: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phonenumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    paymentstatus: {
      type: String,
      required: false,
    },
    profileplan: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    dateofbirth: {
      type: String,
      required: false,
    },
    address1: {
      type: String,
      required: false,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zipcode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
    householdincome: {
      type: String,
      required: false,
    },
    healthcareflag: {
      type: String,
      required: false,
    },
    hospitalsystem: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    chroniccondition: {
      type: String,
      required: false,
    },
    smokerflag: {
      type: String,
      required: false,
    },
    deviceid: {
      type: String,
      required: false,
    },
    devicename: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {},
  }
);

// var deviceRegSchema = new mongoose.Schema({
//     name: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: String,
//     required: true
//   }

// }

module.exports = deviceRegSchema;
