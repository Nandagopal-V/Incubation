const mongoose = require('mongoose');
const adminlogin=new mongoose.Schema({
 
     mail:{
        type:'string',
        required: true
     },
  
    password:{
        type:'string',
        required: true
     }
  
})

module.exports = mongoose.model('admin',adminlogin) 