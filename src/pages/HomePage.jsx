import React, { useEffect,useState } from 'react'
import HomeComponent from '../components/HomeComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader'
const HomePage = () => {

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
          loading ? <Loader/> :<HomeComponent/>
        } 
     </>
  )
}

export default HomePage;