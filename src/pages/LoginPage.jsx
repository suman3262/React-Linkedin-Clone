import React, { useEffect, useState } from 'react'
import LoginComponent from '../components/LoginComponent'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader'

const LoginPage = () => {

  const[loading, setLoading]=useState(true);

  const navigate=useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
     if(res?.accessToken)
       {
         navigate('/home');
       }
       else{
        setLoading(false);
       }

    })
  },[])
  return (
    <>
       {
        loading ? <Loader/> :<LoginComponent/>
       } 
    </>
  )
}

export default LoginPage