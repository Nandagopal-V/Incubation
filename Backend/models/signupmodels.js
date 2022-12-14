const mongoose = require('mongoose');
const signUpTemplate=new mongoose.Schema({
     username:{
        type:'string',
        required: true
     },
     email:{
        type:'string',
        required: true
     },
     phone:{
        type:'string',
        required: true
     },
    password:{
        type:'string',
        required: true
     },
     date:{
        type:Date,
        default:Date.now
     }
})

module.exports = mongoose.model('users',signUpTemplate) 