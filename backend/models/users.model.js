var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:{
      type:String
  },
  mobileNo:{
      type:Number,
      
  },
  Location:{
    type:String,
  },
  vehicleName:{
    type:String,
  },
  smsDescription:{
    type:String,
  },
  date:{
      type:Date,

  }

});

var UserModel = mongoose.model('User', UserSchema );

module.exports= UserModel;