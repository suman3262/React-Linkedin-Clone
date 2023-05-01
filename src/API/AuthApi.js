import { auth } from "../firebase-config"
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,signOut} from 'firebase/auth'

export  const Login_api= async(email,password)=>
{
     try {
        let res=await signInWithEmailAndPassword(auth,email,password);
        return res;
     }
      catch (error) {
       alert('invalid username and password')
     }
}

export const Signup_api= (email,password)=>{

    try {
         let res= createUserWithEmailAndPassword(auth,email,password);
         return res;
        } 

    catch (error) 
    {
        console.log(error);
    }
}

export const GoogleSignInAPI = ()=>{

    try {   
        let googleProvider=new GoogleAuthProvider();
        let  res= signInWithPopup(auth,googleProvider);
        return res;
    } catch (error) {
        return error
    }
}

export const onLogout=()=>{
    try {
        signOut(auth);
    } catch (error) {
        console.log(error)
    }
}