const express = require('express')
const router = express.Router();
const signUpTemplateCopy = require('../models/signupmodels')
const {Incubation} = require('../models/incubationForm')
const {Slots}=require('../models/slotmodel')
const multer = require("multer");
const User=require('../models/signupmodels')
const admin=require('../models/admin')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { request } = require('express');

let data={}
let user={}

router.post('/createadmin',async (req, res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const admindata = await new admin({
        mail:req.body.mail,
        password: hashedPassword
     
        })

        await admindata.save().then((data) => {
            res.json(data)
            console.log('admin created');
        })

})



const verifyUser=(async(req, res, next)=>{
    console.log('checking token in background');
    let token
    console.log('checking token in background  3333333');
            console.log('header iss',req.headers.authorization);
    if(req.headers.authorization){
    console.log('checking token in background  22222');

        try {
            
            

            //get token from header
            token= await req.headers.authorization

            //verify token
               const decoded= await jwt.verify(token,"secretkey")

            //get user from token
            req.user=await User.findById(decoded.id).select('-password')
            user.id=req.user.id;
            console.log('user id iss ',req.user.id);
            // console.log('user id iss ',user.id);
            data.verifystat=true;
             console.log("dfghjk",data.verifystat);
            next();
        } catch (error) {   
          
            console.log(error)
            // res.send({verifystat:false})
            console.log('access denied wrong token');
            data.verifystat=false;
            console.log("dfghjk", data.verifystat);

            next();


            
            
            
        }
     }
    else{
        console.log('access denied');
            // res.send({verifystat:false})
         data.verifystat=false;

            // next();


        
    }
    if(!token){
        console.log("no key found");
        // res.send({verifystat:false})
        data.verifystat=false;

        // next();


        
    }

})


router.post('/checkformtoken',verifyUser,async (req,res)=>{
    console.log('res iss   ',);

    console.log(data.verifystat);
    // console.log('user is  ',req.user.id);


    if(data.verifystat){
        res.json({tokenstat:true,...req.user})
    }else{
        res.json({tokenstat:false})
    }
 })

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("stage 1");
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '--' + file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })

router.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(req.body,"hello");
    console.log('backend crista sewwyyy');

    const signedUpUser = await new signUpTemplateCopy({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword
    })
    //    console.log(signedUpUser,"hello siri");
    await signedUpUser.save().then((data) => {
        // console.log(data,"hello google");
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

router.post('/createslot',async(req,res)=>{
    const createslotinstance= await new Slots({
        number:req.body.number,
        form:req.body.form,
        status:req.body.status
    })
    createslotinstance.save().then((data)=>{
        console.log("successfully applied");
     })

})


router.get('/getpreforms',async(req,res)=>{
  const preforms=await Incubation.find({userId:user.id}).sort({'date':-1}).limit(1)
  console.log('preform iss  ',preforms);
//   const empty = {};
  
if(preforms.length=== 0){
        console.log('perfrom object is empty.....ssuii');
    return res.send({approvestatus:true,declinestatus:true,isEmpty:true});


    }else{
        console.log('perfrom object is not eemmppttyyy');

      return res.send({approvestatus:preforms[0].approvestatus,declinestatus:preforms[0].declinestatus,isEmpty:false});

    }


    
    //   console.log('latst form in back of elssseeeee is  ',preforms[0].approvestatus,'  ',preforms[0].declinestatus);
    //   return res.send({approvestatus:preforms[0].approvestatus,declinestatus:preforms[0].declinestatus});
      

    
   

})




router.post('/form',upload.single("logo"),async(req, res)=>{


    // console.log(req.body);  
    // console.log(req.file);  

    console.log('userid is ',user.id);

    const IncubationForm = await new Incubation({
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        companyName:req.body.companyName,
        backGround:req.body.backGround,
        products:req.body.products,
        problem:req.body.problem,
        solution:req.body.solution,
        vProposition:req.body.vPropostion,
        Incubation:req.body.incubationradio,
        companyLogo:req.file.filename,
        pendingstatus:true,
        approvestatus:false,
        declinestatus:false,
        userId:user.id,
        date:Date.now()
        })
 IncubationForm.save().then((data)=>{
    console.log("successfully applied");
 })
 return res.status(200).send({message:true})

})

router.post('/login', async (req, res) => {
    console.log('login details came to backend  ', req.body);
    let user = await signUpTemplateCopy.findOne({ email: req.body.email })
    console.log('useer details from db is  ', user);
    if (user) {
        const id=user.id;
        console.log('user data is ',user.id);
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            console.log('valid password');
            const token = jwt.sign({ id }, "secretkey", { expiresIn: 36000 })
            console.log('token iss  ', token);
            return res.status(200).json({ message: "valid Email or Password", token: token,declined:false })


        } else {
            console.log('invalid password');


            return res.send({ message: "invalid Password",declined:true })

        }


    } else {
        console.log('invalid user');

        return res.send({ message: "invalid user",declined:true })

    }

})






router.post('/adminlogin', async (req, res) => {
    console.log('login details came to backend  ', req.body);
    let user = await admin.findOne({ mail: req.body.email })
    console.log('admin details from db is  ', user);
    if (user) {
        const id=user.id;
        console.log('user data is ',user.id);
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            console.log('valid password');
            const token = jwt.sign({ id }, "secretkey", { expiresIn: 36000 })
            console.log('admin token iss  ', token);
            return res.status(200).json({ message: "valid Email or Password", token: token ,declined:false})


        } else {
            console.log('invalid password');


            return res.send({ message: "invalid Password" ,declined :true})

        }


    } else {
        console.log('invalid user');

        return res.send({ message: "invalid admin",declined :true })

    }

})










router.post('/newapplicationlist',async (req,res)=>{
    console.log('code is here');
    const datas=await Incubation.find({latest:true})
    console.log(datas,"helloo");
    res.status(200).json(datas)
})

router.get('/getallslots',async (req,res)=>{
    console.log('code is getting all slots');
    const datas=await Slots.find()
    console.log(datas,"helloo");
    res.status(200).json(datas)
})

router.post('/approvedapplicationlist',async (req,res)=>{
    console.log('code is here');
    const datas=await Incubation.find({latest:false,approvestatus:true,pendingstatus:false,slotstatus:false})
    console.log(datas,"helloo");
    res.status(200).json(datas)
})

router.post('/declinedapplicationlist',async (req,res)=>{
    console.log('code is here');
    const datas=await Incubation.find({latest:false,declinestatus:true,pendingstatus:false,slotstatus:false})
    console.log(datas,"helloo");
    res.status(200).json(datas)
})



router.post('/pendingapplicationlist', async (req, res) => {
    console.log('code is here');
    const datas=await Incubation.find({pendingstatus:true,latest:false})
    console.log(datas);
    res.status(200).json(datas)
})


router.post('/bookslot', async (req, res) => {
    console.log('bookslot  ',req.body);
  await Slots.updateOne({_id:req.body.view},{
    $set:{
        status:true,
        form:req.body.companyId[0]

    }

  })

  await Incubation.updateOne({_id:req.body.companyId[0]},{
    $set:{
        slotstatus:true
    }
  })

  const slots=await Slots.find()
  const list=await Incubation.find({latest:false,approvestatus:true,pendingstatus:false,slotstatus:false})


    console.log("mucho gracias list is  ",list);
    res.status(200).json({list,slots})
})



router.get('/getApprovedApplication',async(req,res)=>{
    const datas=await Incubation.find({latest:false,approvestatus:true,pendingstatus:false,slotstatus:false})
    console.log(datas,"helloo");
    res.status(200).json(datas)
})

router.post('/viewModal',(req,res)=>{
    console.log('sssuuuiiiiiiiiiiiiiii');
    console.log(req.body);
  Incubation.findOne({_id:req.body.applicant_id}).then((response)=>{
    res.status(200).json({response})
  }
  )
})

router.post('/approvelist',async(req, res)=>{
    Incubation.updateOne({_id:req.body.formId},{
        $set:{
            approvestatus:true,
            pendingstatus:false

        }
    }).then(async()=>{
        const datas=await Incubation.find({pendingstatus:true,latest:false})
    res.status(200).json({datas})


    })


})


router.post('/declinelist',async(req, res)=>{
    Incubation.updateOne({_id:req.body.formId},{
        $set:{
            
            pendingstatus:false,
            declinestatus:true

        }
    }).then(async()=>{
        const datas=await Incubation.find({pendingstatus:true,latest:false})
    res.status(200).json({datas})


    })


})

router.post('/changeLatest',async (req,res)=>{
    console.log("have a noie day");
   Incubation.updateOne({_id:req.body.formId},{
    $set:{
       latest:false
    }
   }).then(async(response)=>{
   const datas=await Incubation.find({pendingstatus:true,latest:false})
   const latest=await Incubation.find({latest:true})
    res.status(200).json({datas,latest})
    console.log(response);
   })
})


//  verifyUser=(async(req, res, next)=>{
//     let token
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         try {
//             //get token from header
//             token=req.headers.authorization.split(' ')[1];

//             //verify token
//             const decoded=jwt.verify(token,"secretkey")

//             //get user from token
//             req.user=await User.findById(decoded.id).select('-password')
//             next()
//         } catch (error) {
//             console.log(error);
//             res.status(401)
//             throw new Error('not authorized')
            
//         }
//     }

// })






module.exports = router;