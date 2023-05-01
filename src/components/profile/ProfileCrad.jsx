import React, { useEffect, useMemo, useState } from 'react'
import { getSingleStatus,getSingleUser,getStatus,updatePost } from '../../API/FireStore';
import PostCard from '../Post/PostCard';
import { useLocation } from 'react-router-dom';
import { uploadPostImage as uploadimgApi } from '../../API/imageApi';
import {FiEdit} from 'react-icons/fi';



//for progress
import { Progress } from 'antd';
import { Button, Modal } from 'antd';
import Modall from '../Post/Modell';

const ProfileCrad = ({curUser,setIsedit}) => {

    const [posts, setPosts] = useState([]);
    const location=useLocation();
    const [currentProfile, setCurrentProfile] = useState({});
     
    // GETING THE POST OF PERTICULER USER IN THEIR PROFILE LOGIN/NON-LOGIN PROFILE
     const curProfilePost=posts?.filter((post)=>post.userEmail === currentProfile?.email)
     const curData=posts.filter((post)=> post.userEmail===curUser?.email);
    
    
  
    
    useMemo(() => {
      if (location?.state?.id) {
        getSingleStatus(setPosts, location.state.id);
      }
      if (location?.state?.email) {
        getSingleUser(setCurrentProfile, location?.state?.email);
      }
    },[]);
  


    let userMail;
     if(Object.values(currentProfile).length >0)
     {
      userMail=currentProfile?.email;
     } 
    else{
      userMail=curUser?.email;
    }


   // UPDATE POST ON PROFILE SECTION**** 

   
   const getEditdata=(post)=>{
        
    console.log(post);                     
   }
 

   
  return (
    <>
        <div className='realtive w-full lg:w-[60%] mx-auto mt-2 lg:mt-16 lg:min-h-[15rem] border-2'>

           <div className='w-full relative'>
           {
            userMail === localStorage.getItem('userEmail') ?
            (
             <>
             <button 
               onClick={()=>setIsedit()}
              className='m-2 rounded-lg text-white  absolute top-0 right-0 bg-blue-600 px-3 lg:px-8 lg:py-3 py-[0.4rem] text-sm'>Edit Profile</button>
             </>
            )
            :
            (<> </>)
           }
              
           </div>
           
            {/* CREATE A MODEL WHEN SOMEONE CLICK ON IMAGE A MODEL POP UP IMG SHOWING LARGE SCALE */}
           <div     
            className='w-80 flex'>
            <div>
             {
              Object.values(currentProfile).length>0 ? 
              (
                <img 
                 className='w-[100px] h-[100px] rounded-full object-cover m-2' p-1
                src={currentProfile.imglink} alt="" />
              )
              :
              (
                <img 
                 className='w-[100px] h-[100px] rounded-full object-cover p-1
                 m-2 border-[0.5px] border-gray-400'
                src={curUser.imglink} alt="" />
              )
             }
              
            </div>

             <div className='mt-1 -ml-2'>
             {
              userMail === localStorage.getItem('userEmail')
              ?
                <PopUp           
                userID={curUser?.userId}
               /> 
               :
               (
                <div></div>
               )
             }
             </div>
                            
           </div>

           {/* DISPLAY THE CURRENT USER PROPERTY */}
           <div>
              <p className='ml-2 text-xl font-semibold text-blue-600'>
              {Object.values(currentProfile).length > 0
                   ? currentProfile?.name : curUser?.name}
             </p>

             <p className='ml-2 text-lg text-blue-600'>
              {
                Object.values(currentProfile).length > 0
                   ? currentProfile?.college : curUser?.college
              }
             </p>

             <p className='ml-2 text-lg text-blue-600'>
              {
                Object.values(currentProfile).length > 0
                   ? currentProfile?.headline : curUser?.headline
              }
             </p>

             
           </div>
          

        </div>

          {/* MODAL SECTION */}
         <div>
        
          
         </div>

           {/* SHOWING THE POST IN PROFILE */}
        <div>
           {
            Object.values(currentProfile).length > 0 ?
            
            (
             curProfilePost?.length >0
             &&
             curProfilePost?.map((item,index)=>(
              <PostCard
                key={index}
                data={item}
              />
             ))

            )
            :
            (
             <>
             { curData.length>0
                  &&
               curData?.map((item,index)=>(
               
                <PostCard 
                  key={index}
                  data={item}
                  getEditdata={getEditdata}
                />

              ))
             }
             </>
            )

           }
        
          
        </div>
    </>
  )
}
//for POPUP  modal
export const PopUp=({userID})=>{


  const [currentImg,setCurrentImg]=useState({})

    function getImg(e)
    {
        setCurrentImg(e.target.files[0]);
    }

    const[progress,setProgress]=useState(0)
    
    //  UPLOAD THE IMG & GENERATE THE IMG LINK
     function uploadImg()
     {
       uploadimgApi(currentImg,userID,setProgress)
       if(progress===100)
       {
        alert('Image uploded Sucessfully')
       }
     }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
     <>
       <Button type="primary" onClick={showModal} className='bg-blue-800 w-10 px-auto'>
        <FiEdit size={10}/>
      </Button>
      <Modal title="Upload Image" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
           
           <label className='flex my-2'>
             
             <input 
            
              onChange={getImg}
              type="file"  accept="image/*"/>
              <Button type="primary" onClick={uploadImg} className='bg-blue-800 '>
                 Upload
              </Button>
           
           </label>
        
           
        <div className='flex justify-center items-center'>
          <Progress type="circle" percent={progress} />
        </div>
      </Modal>
      
     </>
  )
}

export default ProfileCrad