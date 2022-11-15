import React,{useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from '../../config/config';



export default function Login() {
const navigate = useNavigate();
const [email,setEmail]=useState("")
const [password,setPassword]=useState("") 
const  token  = localStorage.getItem('token') 
const[islogindeclined,Setislogindeclined]=useState(false)


// const authorizeToken = () => {
//     if(token){
//           navigate('/');
//     }else{
//       navigate('/login')
//     }
//   }


//   useEffect(()=>{
//     authorizeToken()
// },[])



useEffect(()=>{
        
    if(token){
        console.log('token is in local storage');
        axios.post('http://localhost:4000/checkformtoken',{data:'data'}, {
            headers: {
                authorization: localStorage.getItem('token') 
            }
            
        }).then((response) => {
            console.log("response");
            console.log(response.data.tokenstat);


            if(response.data.tokenstat){
                console.log('token stat in react is ',response.data.tokenstat);

            navigate('/');
        }
            else{
        navigate('/login')

            }

        })
      
    }else{
        navigate('/login')
    }


},[islogindeclined])


const submitHandler=async(e)=>{
    e.preventDefault()
    const loginData= {
        email: email,
        password: password
    }

    await axios.post('http://localhost:4000/login',loginData).then((response)=>{   
        console.log('response from loin iss   '); 
        console.log('response.data,declined is     ',response.data.declined);
        if(response.data.declined){
            
            Setislogindeclined(true)

        }else{


            
            console.log(response.data.token);
    
            const {token}=response.data.token;
            localStorage.setItem( "token",response.data.token);
    
    
    
            setEmail("")
            setPassword("")
    
    
            
            navigate('/')
        }



    }).catch((err => {
        console.log(err);
    }))
}

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <div className=" w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-600 md:text  uppercase ">
                   Sign in
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
                    {/* <a
                        href="#"
                        className="text-xs text-orange-600 hover:underline"
                    >
                        Forget Password?
                    </a> */}
                   {islogindeclined && <span className='text-red-600'>invalid credentials</span>}
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
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
                </p>
            </div>
        </div>
    );
}