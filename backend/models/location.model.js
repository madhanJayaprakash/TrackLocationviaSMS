var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let locationSchema= new Schema({
    mobileNo:{
        type:Number
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },      
},{
    timestamps:true,
})
var locationModel = mongoose.model('Location',locationSchema);
module.exports= locationModel;