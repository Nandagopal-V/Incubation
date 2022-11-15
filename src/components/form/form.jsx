import React,{useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import axios from '../../config/config';




function Form() {
const navigate = useNavigate();


    const  token  = localStorage.getItem('token') 
    const[approvestat,setApprovestat]= useState()
    const[declinestat,setDeclinestat]= useState()
    const [showstat,setShowstat]=useState()
   const [formclear,setFormclear]=useState(true)

    const [form, setForm] = useState({
        name:'',
        address:"",
        city:"",
        state:"",
        email:"",
        phoneNumber:"",
        companyName:"",
        companyLogo:"",
        backGround:"",
        products:"",
        problem:"",
        solution:"",
        vPropostion:"",
        incubationradio:"",
        logo:"",
    })
    

    
      useEffect(()=>{
        
            if(token){
                console.log('token is in local storage');
                axios.post('http://localhost:4000/checkformtoken',{data:'data'}, {
                    headers: {
                        authorization: localStorage.getItem('token') 
                    }
                    
                }).then(async(response) => {
                    console.log("response");
                    console.log(response.data.tokenstat);

    
                    if(response.data.tokenstat){
                        console.log('token stat in react is ',response.data.tokenstat);

                      await  axios.get('http://localhost:4000/getpreforms').then(async(response)=>{
                        console.log('response is',response);
                        const stateA=await response.data.approvestatus
                       const stateD= await  response.data.declinestatus
                       await   setApprovestat(stateA)
                        await   setDeclinestat(stateD)
                                    console.log('approvestat iss   ',approvestat);
                               console.log('declinestat iss   ',declinestat);
                       

                       

                            
                            if(approvestat===true||declinestat===true){
                                console.log('displaying form');
                                setShowstat(true)
                            }
                            else{
                                console.log('displaying notification');

                                setShowstat(false)
                                
                            }
                            console.log('token success');
                            navigate('/');
                        

                        })
    
                }
                    else{
                console.log(' token  in store but invalid');

                navigate('/login')
    
                    }
    
                })
              
            }else{
                console.log('no token is in store');
                navigate('/login')
            }
        
    
    },[approvestat,declinestat,showstat,navigate,formclear])




    const onChangeHandler=(e) => {
        setForm({...form,[e.target.name]:e.target.value})
      }

      const uploadFile = ( event )=>{
        let file = event.target.files[0];
        console.log(file);
        setForm({...form, logo: file });
        }

    
        
        const onSubmitfunction = (e) => {
            e.preventDefault()
            let data = new FormData();
            for (let key in form) {
                data.append(key, form[key]) // email , 
            }
            console.log('data append after is  ',data);
    
            axios.post('http://localhost:4000/form',data, {
                headers: {'Content-Type': 'multipart/form-data' }
            }).then((response)=>{

           
                if(response.data.message){
                    console.log('going to rerender  page');
                    setFormclear(!formclear)

                    // navigate('/');
                }





            }).catch((err)=>{
                console.log('error after submitting');
                console.log(err);
            })
            
        }    

  

    return (
        <div>
         

        {showstat===true  && <div>
            <form onSubmit={onSubmitfunction}    >            <h1 className='font-bold text-center text-2xl pt-6 underline '>APPLICATIONS FOR INCUBATION</h1>
        <div className='grid grid-cols-2 gap-6 pt-10 pl-4 pr-4'>


            <div className="mb-2 ">
                <label
                    for="text"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Name
                </label>
                <input
                  onChange={onChangeHandler}
                  value={form.name}
                  name='name'
                  required
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2 ">
                <label
                    for="text"
                    className="block text-sm font-semibold text-gray-800"
                >
                   Address
                </label>
                <input
                  onChange={onChangeHandler}
                  value={form.address}
                  required

                  name='address'
                  type="text"
                    
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2 ">
                <label
                    for="text"
                    className="block text-sm font-semibold text-gray-800"
                >
                   City
                </label>
                <input
                   onChange={onChangeHandler}
                  required

                   value={form.city}
                   name='city'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2 ">
                <label
                    for="text"
                    className="block text-sm font-semibold text-gray-800"
                >
                   State
                </label>
                <input
                 onChange={onChangeHandler}
                 required

                 value={form.state}
                 name='state'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2 ">
                <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  onChange={onChangeHandler}
                  required

                  value={form.email}
                  name='email'
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2 ">
                <label
                    for="number"
                    className="block text-sm font-semibold text-gray-800"
                >
                  Phone
                </label>
                <input
                  onChange={onChangeHandler}
                  required

                  value={form.phoneNumber}
                  name='phoneNumber'
                    type="number"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2 ">
                <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                   Company Name
                </label>
                <input
                    onChange={onChangeHandler}
                  required

                    value={form.companyName}
                    name='companyName'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2 ">
                <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                  Company Logo
                </label>
                <input
                 onChange={uploadFile}  name='logo' 
                 required

                
                    type="file"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

        </div>

        <div className='grid grid-cols-1 gap-2   pt-2 pl-4 pr-4'>

        <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                   Describe Your Team Background
                </label>
                <input
                   onChange={onChangeHandler}
                  required

                   value={form.backGround}
                   name='backGround'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                
        <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                   Describe Your Company and Products
                </label>
                <input
                   onChange={onChangeHandler}
                   value={form.products}
                  required

                   name='products'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                
        <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                   Describe The Problem You are Trying to solve
                </label>
                <input
                 onChange={onChangeHandler}
                 value={form.problem}
                 required

                 name='problem'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />


                
        <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                  What is unique about your Solution
                </label>
                <input
                  onChange={onChangeHandler}
                  value={form.solution}
                  required

                  name='solution'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />


                
        <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                   What is your value proposition for the customers?
                </label>
                <input
                 onChange={onChangeHandler}
                 required

                 value={form.vPropostion}
                 name='vPropostion'
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />


         
        </div>


        <label
                        for="email"
                        className="block text-base font-semibold text-gray-800 text-center pt-8"
                    >
                        Type of Incubation Needed
                    </label>

        <div className='grid grid-cols-2 gap-2 text-center pt-5'>
       


                   <div onChange={onChangeHandler} className='md:pl-12 col-span-2 md:col-span-1 bg-orange-600 rounded-sm mx-5 py-2  text-white font-medium'><input type="radio" name="incubationradio" value='physical' checked="checked"  /> <span>Physical Incubation</span></div> 
                   <div onChange={onChangeHandler}  className='md:pl-12 col-span-2 md:col-span-1 bg-orange-600 md:bg-orange-600 rounded-sm mx-5 text-white font-medium py-2'><input type="radio" value='virtual' name="incubationradio" /> <span>Virtual Incubation</span></div> 
        </div>

        <div className='text-center pt-8'><button type='submit' className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-300 rounded '>SUBMIT</button></div>


        </form>
        </div>}

        {showstat===false &&<div>
                  <h1 className='text-center mt-[250px] font-bold text-2xl'>YOUR APLLICATION IS UNDER PROCESS</h1>
        </div>}


        </div>
    )
}

export default Form;