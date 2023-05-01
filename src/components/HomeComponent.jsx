import React, { useMemo, useState } from 'react'
import { Navbar } from './common/Navbar';
import Post from './Post/Post';
import { getCurrentUser } from '../API/FireStore';
const HomeComponent = () => {

  const [curUser,setcurUser]=useState({})

  useMemo(()=>{
    getCurrentUser(setcurUser);
  },[])

  return (
    <>
    <div className='bg-[#F3F2EF]'>
    <Navbar/>
      <Post curUser={curUser} />
    </div>
      
    </>
  )
}

export default HomeComponent;