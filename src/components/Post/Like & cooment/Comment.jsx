import React, { useMemo, useState } from 'react'

import { postComment,getComments } from '../../../API/FireStore'
import { getTimeStamp } from '../../common/TimeStamp';
import {FaTelegramPlane} from 'react-icons/fa'
import Item from 'antd/es/list/Item';

const Comment = ({id,postID,name}) => {
 
const [allComments,setAllcomments]=useState([])    


  const [comment,setComment]=useState('')


    function submitHandler(e)
    {
       e.preventDefault();
      postComment(postID,comment,getTimeStamp('LLL'),name,id)

      setComment('');
    }

     useMemo(()=>{
        
    
      getComments(postID,setAllcomments);
     },[])

 

    
  return (
    <div>
       
        <div className=''>
        
      
                <form onSubmit={submitHandler} 
                 className='flex gap-2'
                >
                 <input 
                   type="text"
                  name='name'
                  value={comment}
                  onChange={(e)=> setComment(e.target.value)}
                  className='outline-none border-2 w-full h-8 overflow-auto'
                  required
                 />
                <button>
                   <FaTelegramPlane className='text-blue-600' size={20}/>
                </button>
              </form>
          
          
        
         <div>
            {
                allComments.length >0 &&

                allComments?.map((item,index)=>{
                    return <p 
                    className='border-[0.5px] border-blue-500 my-2 pl-1 py-1 rounded-sm '
                    key={index}> 
                    <span>{item?.comment}</span>
                    <p className='flex justify-between items-center px-[2px]'>

                    {/* Extra aditional for after comment ,if user update their name it will be reflect */}
                     <span className='text-slate-500'>
                      {
                        id===item?.id ? (<span>{name} </span>) :( <span>{item?.name} </span>)
                        
                      }
                     </span>

                    <span className='text-blue-700'>{getTimeStamp('LLL')}</span>
                    </p>
                    
                    </p>
                })
            }
         </div>
            
        </div>

      
    </div>
  )
}

export default Comment

