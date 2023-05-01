import {React,useMemo, useState }from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser,getAlluser,deletePost } from '../../API/FireStore';
import Likecompo from './Like & cooment/Likecompo';
import Comment from './Like & cooment/Comment';
import {CiEdit} from 'react-icons/ci';
import {MdDeleteForever} from 'react-icons/md';
import {AiOutlineComment} from 'react-icons/ai';

const PostCard = ({data,getEditdata}) => {

const navigate=useNavigate()

  const [user,setUser]=useState({});
  const[allUser,setAlluser]=useState([]);



  useMemo(()=>{
     
    getCurrentUser(setUser);
    getAlluser(setAlluser);
  },[])



  // console.log(allUser.filter((user)=>user.id ===data.userID)[0]?.name);
  // console.log(allUser);
  const imglink=allUser.filter((item)=> item.id===data.userID)[0]?.imglink
 
 function clickhandler()
 {
    navigate('/profile',
   {
    state:{
      id:data.userID,
      email:data.userEmail
        }
   }
 )
 }

 // HANDEL THE COMMENT SECTION OPEN AND CLOSE 
 const [iscmnt,setIscmnt]=useState(false);

 function clickHandler()
 {
  setIscmnt(!iscmnt);

 }

  return (
    <>
       <div className='w-[90%] lg:w-[60%] mx-auto shadow-lg my-3 lg:my-8 rounded-sm p-2 bg-[#fff]'>

           <div className='flex gap-2 items-center'>
               <img 
               src={imglink} width={25} alt="profile_image" 
               className='object-cover rounded-full w-10 h-10' 
               />
               <p 
                className='text-xl text-blue-900 font-medium cursor-pointer'
                 onClick={clickhandler}>{
               
                allUser.filter((user)=>user.id ===data.userID)[0]?.name
                  }
               </p>

               <div className='flex gap-2 ml-20'>
               {
                data.userID === user.userId ?

             (
              <>
               <CiEdit 
                  onClick={()=>getEditdata(data)}
                  className='text-blue-900 cursor-pointer' 
                  size={20}
               />
                        
             <MdDeleteForever 
              onClick={()=>deletePost(data?.id)}
             className='text-blue-900 cursor-pointer' size={20}/>
              </>) :

             (<></>)

              }
           </div>
           </div>
         
          
          <p className='text-blue-700 mt-1 mb-2'>{data?.timestamp}</p>
          <p className='text-xl text-sky-700 font-medium'>{data?.status}</p>
          
          <div className='relative flex items-center justify-between  mt-3 text-blue-700'> 
            
             <div>
             <Likecompo 
             id={user?.userId}
             postID={data?.postID}
            />
             </div>

            <div>
              <AiOutlineComment size={25} 
               className='cursor-pointer'
               onClick={clickHandler}
               />
            </div>

          </div>

          <div>
            {
              iscmnt ? (
                <Comment
                id={user?.userId}
                postID={data?.postID}
                name={user?.name}
              />) :(<div> </div>)
            }
          </div>
        

       </div>
   
    </>
  )
}

export default PostCard;