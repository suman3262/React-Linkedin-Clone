import React from 'react'
import { onLogout } from '../API/AuthApi';


const LogoutComponent = () => {
   

   

  return (
   <>
      <div className='mt-4'>
         
          {/* <button className='bg-blue-700' onClick={handelClick}>View profile</button> */}
         <button 
         className='w-fit px-4 rounded-md text-white font-semibold py-3 bg-blue-700 hover:bg-blue-900 transition-all duration-300'
         onClick={()=>onLogout()}>Log out</button>
      </div>
   </>
  )
}

export default LogoutComponent;