import React, { useMemo, useState } from 'react'
import {AiOutlineLike,AiFillLike} from 'react-icons/ai'
import { likePost,getLikesByUser } from '../../../API/FireStore';


const Likecompo = ({id,postID}) => {
    const [likeCount ,setLikecount]=useState(0);
    const[isLike,setIslike]=useState(false);


     function clickHandler()
     {
      
        likePost(id,postID,isLike);
     }

     useMemo(()=>{

       getLikesByUser(id,postID,setIslike,setLikecount)
     },[id,postID])

  return (
    <div>
        <div 
          className='ml-3 w-fit p-1'
        onClick={clickHandler} >
            { isLike ? <AiFillLike  size={25} /> :  <AiOutlineLike  size={25}/>}
            <p>Like {likeCount}</p>

        </div>
       
      
    </div>
  )
}

export default Likecompo;