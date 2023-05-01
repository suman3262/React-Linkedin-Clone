import React, { useMemo, useState } from 'react'
import { Navbar } from '../common/Navbar'
import { getCurrentUser } from '../../API/FireStore'
import ProfileCrad from './ProfileCrad'
import EditProfile from './EditProfile'


const ProfileComponent = () => {
    const [curUser,setcurUser]=useState({})
    const[isEdit,setIsedit]=useState(false);
    
    useMemo(()=>{
      getCurrentUser(setcurUser);
    },[])

    function handeledit()
    {
        setIsedit(!isEdit);
    }

  return (
    <>
        <Navbar/>

        <div className='w-[90%] mx-auto mt-4 '>
        {
            isEdit ? (<EditProfile
                       setIsedit={handeledit}
                       curUser={curUser}
                     
            />) :(<ProfileCrad
                 curUser={curUser}
                 setIsedit={handeledit}
            />)
        }
        </div>
       
        
    </>
  )
}

export default ProfileComponent