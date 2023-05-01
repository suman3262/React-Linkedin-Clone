import React, { useEffect, useState } from 'react'
import ProfileComponent from '../components/profile/ProfileComponent'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Profile = () => {
    const navigate=useNavigate();
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
      onAuthStateChanged(auth,(res)=>{
       if(!res?.accessToken)
         {
           navigate('/');
         }
         else{
          setLoading(false);
         }
  
      })
    },[])
  return (
    <>
        {
          loading ? <Loader/> :<ProfileComponent/>
        } 
    </>
  )
}

export default Profile