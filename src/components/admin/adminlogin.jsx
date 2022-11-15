import React,{useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from '../../config/config';



export default function AdminLogin() {
const navigate = useNavigate();
const [email,setEmail]=useState("")
const [password,setPassword]=useState("") 
const  token  = localStorage.getItem('admintoken') 
const[islogindeclined,Setislogindeclined]=useState(false)


useEffect(()=>{
    if(token){
        navigate('/admin/applicationlist')

    }
    else{
        navigate('/adminlogin')

    }
},[])



const submitHandler=async(e)=>{
    e.preventDefault()
    const loginData= {
        email: email,
        password: password
    }

    await axios.post('http://localhost:4000/adminlogin',loginData).then((response)=>{   
        console.log('response is   '); 
        console.log(response.data.token);
        if(response.data.declined){
            Setislogindeclined(true)



        }else{

            const {token}=response.data.token;
            localStorage.setItem( "admintoken",response.data.token);
    
    
    
            setEmail("")
            setPassword("")
    
    
            
            navigate('/admin/applicationlist')
        }



    }).catch((err => {
        console.log(err);
    }))
}

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <div className=" w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-600 md:text  uppercase ">
                   ADMIN
                </h1>
                <form className="mt-6" onSubmit={submitHandler}>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                            value={email}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                            value={password}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                                    {islogindeclined && <span className='text-red-600'>invalid credentials</span>}

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                {/* <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        onClick={() =>{
                            navigate('/signup');
                        }}
                        className="font-medium text-orange-600 hover:underline" style={{cursor: "pointer"}}
                    >
                        Sign up
                    </a>
                </p> */}
            </div>
        </div>
    );



}