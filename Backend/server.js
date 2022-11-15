const express=require('express');
const app = express();
const mongoose =require('mongoose')
// const dotenv=require('dotenv');
const userRoutes = require('./routes/routes')
const cors=require('cors')



// dotenv.config()

// mongoose.connect(process.env.DATABASE_ACCESS,()=>{
//     console.log('database connection established');
// })

mongoose.connect('mongodb://localhost:27017/incubation',
  {
    useNewUrlParser: true,

    useUnifiedTopology: true
  }
);

app.use(express.json())
app.use(cors())
app.use('/',userRoutes)

app.listen(4000,()=>{
    console.log("server 4000 started running");
})