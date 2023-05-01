import React from 'react'
import {  Button, Modal } from 'antd';
import { postsApi } from '../../API/FireStore';
import { getTimeStamp } from '../common/TimeStamp';
import uuid from 'react-uuid';

const Modall = (
  {
  isModalOpen,
  setIsModalOpen,
  status,
  setStatus,
  curUser,
  isEdit,
  updateStatus,
  setIsedit,
  imgLink
}) => {

  const userEmail=localStorage.getItem('userEmail');
    const handleOk = () => {
        setStatus('');
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setStatus('');
        setIsModalOpen(false);
      };
    
      function sendPost()
      {

        console.log(imgLink);
        let obj={
          status:status,
          timestamp:getTimeStamp('LLL'),
          userEmail:userEmail,
          userName:curUser.name,
          postID:getUuid(),
          userID:curUser.userId,

        }
        postsApi(obj);
        setStatus('');
        setIsedit(false);
        setIsModalOpen(false);
      }

  return (
    <div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
     footer={[    
          <Button 
           key="submit" 
           type='primary' 
           disabled={status.length===0}
           className='bg-blue-400'
           onClick={isEdit ? updateStatus : sendPost}
          >
            {isEdit ? 'Update' : 'Post'}
          </Button>
         
          ]}
       >
         <input 
          value={status}
          onChange={(e)=> setStatus(e.target.value)}
          type="txet"
          className='w-full h-11 pl-4 rounded-sm border-2 outline-none'
           />

           {/* NEW 

           <div className='relative'>
            <input
            value={imgLink}    
            onChange={(e)=>setStatus(e.target.value)}
            type="file"  
            accept="image/*"/>
           </div>
           */}
           
        
      </Modal>

    </div>
  )
}

export const getUuid=()=>{
 
  let id = uuid();

    return id;
}

export default Modall;