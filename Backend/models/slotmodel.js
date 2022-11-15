const mongoose = require('mongoose');
const slots=new mongoose.Schema({
    number:{
       type:'string',
       required: true
    },
    form:{
       type:'string',
       required: true
    },
    status:{
       type:Boolean,
       required: true
    }
//    password:{
//        type:'string',
//        required: true
//     },
//     date:{
//        type:Date,
//        default:Date.now
//     }
})
const Slots=mongoose.model('Slots', slots)
module.exports={Slots};
