import React, { useState } from 'react';
import { Login_api } from '../API/AuthApi';
import { toast } from 'react-toastify';
import logo from '../assets/linkedin.png';
import { NavLink } from 'react-router-dom';
import { Signup_api } from '../API/AuthApi';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { postUser } from '../API/FireStore';
const SignUpComponent = () => {

    const navigate=useNavigate();
    const [data,setData]=useState({
        name:'',
        email:'',
        password:'',
        userID:getUuid(),
        imglink:'https://shorturl.at/zEFKR'
    })

    function changeHandler(e)
    {
        setData((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
    }

  async  function login(e)
    {
         e.preventDefault()
      
        try {
            let ress= await Signup_api(data.email,data.password);

            localStorage.setItem('userEmail',ress.user.email);
            postUser(data);
            alert('account created Sucessfully')
            navigate('/home')
        } 
        catch (error) {
            console.log(error)
        }
    }



  return (
       <>
          <div className='w-screen h-screen' >

           <img 
           className='w-16 h-16 rounded-full'
           src={logo}   alt="logo" />
                <form onSubmit={login} 
                className='w-full lg:w-[35%] mx-auto flex flex-col border-2 border-blue-900 py-2 rounded-md justify-center items-center gap-5'>
                  <h1 
                  className='  text-center text-2xl font-mono text-blue-600 tracking-wide font-bold'>Sign Up</h1>
                
                  <label className='w-[95%] ml-2 '  >
                  <p className='text-xl my-1 text-blue-700  font-semibold'>Name</p>
                  <input 
                    required
                    type="text" 
                    name='name'
                    value={data.name}
                    onChange={changeHandler}   
                    placeholder='Enter your Name' 
                    className='w-full border-2 outline-none p-4 rounded-md'
                    />
                </label>

                <label className='w-[95%] ml-2 '  >
                 <p className='text-xl text-blue-700 my-1 font-semibold'>Email</p>
                  <input 
                    required
                    type="email" 
                    name='email'
                    value={data.email}
                    onChange={changeHandler}   
                    placeholder='Enter email' 
                    className='w-full border-2 outline-none p-4 rounded-md'
                    />
                </label>

                 <lable  className='w-[95%] ml-2 '  >
                  <p className='text-xl text-blue-700 font-semibold'>Password</p>
                 <input
                     required
                     type='password'  
                     name='password'
                     value={data.password}
                     onChange={changeHandler} 
                     placeholder='password'
                     className='w-full border-2 outline-none p-4 rounded-md'
                    />

                 </lable> 
                  

                    <button className='text-xl font-medium text-white bg-blue-600 rounded-md px-4 py-2'>Join</button>
                </form>

                <div className='text-blue-700 text-center text-xl font-normal'>
                    <NavLink to='/'>All ready have account</NavLink>
                </div>
          </div>
       </>
  )
}

export const getUuid=()=>{
 
    let id = uuid();
  
      return id;
  }
export default SignUpComponent;