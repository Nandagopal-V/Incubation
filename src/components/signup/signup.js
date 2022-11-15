import React,{useState} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from '../../config/config';
import {useForm} from 'react-hook-form';


 function Signup() {
const navigate = useNavigate();

// const [username, setUsername] = useState()
// const [email, setEmail] = useState("")
// const [phone, setPhone] = useState("")
// const [password, setPassword] = useState("")

const { register, handleSubmit, formState: { errors },reset } = useForm();

const signUpHandler=async(data,e)=>{
    e.preventDefault()
    
    // setEmail(data.mail)
    // setPhone(data.phone)
    // setPassword(data.password)


    // setUsername(data.name)
    
    // console.log('setusername is  ',username);
    
    // console.log('name is  ');
    // console.log('name is  ',data.name);
    // console.log('name is  ',data.mail);
    // console.log('name is  ',data.phone);
    // console.log('name is  ',data.password);

    const signUpData={
        username:data.name,
        email:data.mail,
        phone:data.phone,
        password:data.password
    }
    console.log('data details iss  ',data);
    console.log('crista sewwyyy');
    console.log('object iss ',signUpData);

    await axios.post('http://localhost:4000/signup',signUpData).then((Response)=>{
        console.log('data send');
        navigate('/login');
    }).catch((err)=>{
        console.log('errroorrrr');
        console.log(err);
    })

  
    reset();

}

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <div className=" w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-600 md:text  uppercase ">
                   Sign up
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(signUpHandler)}>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            // onChange={(e) => { setUsername(e.target.value)}}
                            // value={username}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("name", {
                                required: 'Name is required' ,
                                pattern:{
                                    value:/^[A-Za-z]+$/,
                                    message:'Should only contain characters '
                                
                            }
                              })}
                        />
                        {errors.name&&(<small className='text-red-700'>{errors.name.message}</small>)}
                    </div>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            // onChange={(e) => { setEmail(e.target.value)}}
                            // value={email}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("mail", {
                                required: 'Email is required' , pattern:{
                                    value:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                                    message: 'Enter valid email'
                                }
                              })}
                        />
                                                {errors.mail&&(<small className='text-red-700'>{errors.mail.message}</small>)}



                    </div>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            type="number"
                            // onChange={(e) => { setPhone(e.target.value)}}
                            // value={phone}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("phone", {
                                required: 'Phone number is required' ,
                                    pattern:{
                                        value:/^[6-9]\d{9}$/,
                                        message:'invalid phone number'
                                    
                                }
                              })}
                        />
                                                {errors.phone&&(<small className='text-red-700'>{errors.phone.message}</small>)}


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
                            // onChange={(e) => { setPassword(e.target.value)}}
                            // value={password}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("password", {
                                required: 'Password  is required' ,
                                pattern:{
                                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                    message:'should have each character,digit & specialcharacter'
                                
                            }
                               
                              })}
                        />
                                                {errors.password&&(<small className='text-red-700'>{errors.password.message}</small>)}


                    </div>
                    {/* <a
                        href="#"
                        className="text-xs text-orange-600 hover:underline"
                    >
                        Forget Password?
                    </a> */}
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-purple-600">
                            Signup
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <a 
                          onClick={() =>{
                            navigate('/login');
                        }}
                        className="font-medium text-orange-600 hover:underline" style={{cursor: "pointer"}}
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;