import React, { useMemo, useState } from 'react'
import Modall from './Modell';
import { Button } from '@chakra-ui/react';
import { getStatus,updatePost } from '../../API/FireStore';
import PostCard from './PostCard';
const Post = ({curUser}) => {

  // for model OPEN & CLOSE STATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  //get message or post 
  const [status, setStatus] = useState('');
  
  //SET POST
  const [posts, setPosts] = useState([]);

     // EDIT POST PURPOSE
  const [isEdit,setIsedit]=useState(false);

  useMemo(() => {

    getStatus(setPosts);

  }, [])


  const showModal = () => {
    
    setIsedit(false);
    setIsModalOpen(true);
  };

  const[updateId ,setUpdateId]=useState('')

  // geting the post when click on edit icon
  const getEditdata=(post)=>
  {
    setUpdateId(post?.id)
    setIsedit(true);
    setIsModalOpen(true);
    setStatus(post?.status);
  }

  // update data of post after edit
  const updateStatus=()=>{

    updatePost(updateId,status);
    setIsModalOpen(false);
  }

  return (
    <>
    <div className='w-full lg:w-[80%] mx-auto m-10 gap-3 flex flex-col lg:flex-row '>
     
       {/* HOME PAGE IMG SECTION */}
       <div className=' w-full lg:w-[30%] '>
         <div className='w-full shadow-lg hover:scale-105 transition-all duration-300 rounded-lg relative ml-0 lg:ml-5'>
           <img 
            className='w-24 h-24 object-cover rounded-full absolute top-[10%] left-[50%] translate-x-[-50%]'
             src={curUser?.imglink} alt="/profile" loading='lazy'/>  
            <div className='bg-[#F2F3FE] w-full h-14'>

             </div>

            <div className='bg-[#fff] w-full h-16'>
           
            </div>
            <h1 className='text-center mt-1 text-lg font-bold'>{curUser?.name}</h1>
            <h1 className='text-blue-600 text-center'>{curUser?.college}</h1>
            <h1 className='text-blue-600 text-center'>{curUser?.headline}</h1>
         </div> 

          <div className='lg:block hidden mt-12 bg-[#fff] w-full shadow-lg hover:scale-105 transition-all duration-300 rounded-lg relative ml-0 lg:ml-5 px-3 py-5'>
            <h1 className='text-blue-800 font-mono font-medium'>Groups</h1>
            <h1 className='text-blue-800 font-mono font-medium'>Events</h1>
            <h1 className='text-blue-800 font-mono font-medium'>Followed Hastag_#</h1>
          </div>
        
       </div>

       {/* POST SECTION */}
      <div className='w-[100%]  lg:w-[42%] ml-0 lg:ml-14  border-2 mt-10 lg:mt-0 h-32 lg:h-40 rounded-md bg-[#fff]'>

        <div className='w-[90%] mx-auto mt-8 flex  gap-2 items-center'>
     
          <img 
          className='w-12 h-12 rounded-full object-cover '
          src={curUser?.imglink} alt="" />
        
            <button
            onClick={showModal}
            className='bg-gray-100 w-full h-14 rounded-md text-left pl-6'>
            Create a post....... 
            </button>

          {isModalOpen ? (
            <Modall
              curUser={curUser}
              status={status} 
              setStatus={setStatus}
              isModalOpen={isModalOpen} 
              setIsModalOpen={setIsModalOpen} 
              isEdit={isEdit}
              updateStatus={updateStatus}
              setIsedit={setIsedit}

              //  Add New
             
              />
          ) : (
            <div></div>
          )}
        </div>



      </div>
        
      
    </div>

      <div className='w-full lg:w-[60%] mx-auto -mt-0 lg:-mt-40 '>
            {
              <div className='mt-2 ml-0 lg:ml-[20%]'>
              {
                posts?.map((post,index)=>(
                   
                   <PostCard
                    key={index}
                    data={post}
                    getEditdata={getEditdata}
                   />
                ))
              }
              </div>
            }
      </div>

</>
  )
}

export default Post;