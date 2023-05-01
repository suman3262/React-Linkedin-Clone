import React, { useState } from 'react';
import { Login_api } from '../API/AuthApi';
import logo from '../assets/linkedin.png';
import { NavLink, useNavigate } from 'react-router-dom';

import sideSvg from '../assets/Login.svg'

const LoginComponent = () => {

    const navigate=useNavigate()
    const [data,setData]=useState({
        email:'',
        password:'',
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
            let ress= await Login_api(data.email,data.password);
            localStorage.setItem('userEmail',ress.user.email)
            navigate('/home')
            alert('Sucessfully Log In')
        } 
        catch (error) {
          
        }
    }



  return (
       <>
          <div className='w-screen h-screen overflow-x-hidden'>
          <img 
          className='w-16'
          src={logo} alt="logo" />
             
             <h1 
             className='text-2xl w-full lg:w-[90%] mx-auto text-blue-600 font-medium pl-3 lg:pl-10'>
             Welcome to your professional community
             </h1>

             <div className='w-[90%] mx-auto flex flex-col lg:flex-row'>
            
                <form onSubmit={login} 
                className='w-full lg:w-[45%] flex flex-col justify-center 
                border-2 border-blue-500 mx-auto py-2 rounded-md mt-5 lg:mt-6
                items-center gap-5'>

           
                <label className='w-[95%] ml-2' >
                 <p className='text-xl text-blue-600 font-semibold my-1'>Email</p>
                  <input 
                    type="text" 
                    name='email'
                    value={data.email}
                    onChange={changeHandler}   
                    placeholder='Enter email' 
                    className='w-full border-2 outline-none p-4 rounded-md'
                    />
                </label>

                 <lable  className='w-[95%] ml-2'  >
                 <p className='text-xl text-blue-600 my-1 font-semibold'>Password</p>
                 <input
                     type='password'  
                     name='password'
                     value={data.password}
                     onChange={changeHandler} 
                     placeholder='password'
                     className='w-full border-2 outline-none p-4 rounded-md'
                    />

                 </lable> 
                  

                <button 
                  className='hover:bg-blue-900 transition-all duration-300 text-xl text-white font-medium bg-blue-600 rounded-md px-4 py-2'>
                  Log In
                </button>

                </form>

                <div className='p-2 w-[90%] lg:w-[45%] mx-auto'>
                    <img src={sideSvg} alt="/login_image" />
                </div>
             </div>
               

               

                <div className='text-blue-700 w-full lg:w-[90%] mx-auto pl-6 my-3'>
                    <NavLink
                    className='font-medium text-xl'
                     to='/signup'>are you a new user ?
                     </NavLink>
                </div>
          </div>
       </>
  )
}

export default LoginComponent