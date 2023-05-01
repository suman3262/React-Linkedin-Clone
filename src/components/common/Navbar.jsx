import React, { useEffect, useMemo, useState } from 'react'
import {ImLinkedin} from 'react-icons/im'
import {FaSearch} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillMessage} from 'react-icons/ai';
import {AiFillHome} from 'react-icons/ai';
import LogoutComponent from '../LogoutComponent';
import { getCurrentUser } from '../../API/FireStore';
import { NavLink } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getAlluser } from '../../API/FireStore';
import SearchUsers from './SearchUsers';
import './Navbar.scss'

export const Navbar = () => {
 
  // for search start
  const navigate=useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAlluser(setUsers);
  }, []);

  // search end



  const [currrentUser,setCurrentUser]=useState({})
  
  useMemo(()=>{
    getCurrentUser(setCurrentUser);
  },[]);


  return (
    <>
        <div className='flex justify-between items-center w-full pt-3 lg:w-[70%] mx-auto'>
             <div className='flex gap-4 lg:gap-8 '>
                 <NavLink to={'/home'} > 
                  <ImLinkedin className='text-blue-800' size={30}/>
                 </NavLink>

                 {
                  isSearch ?
                  ( <SearchUsers
                        setIsSearch={setIsSearch}
                        setSearchInput={setSearchInput}
                  />)
                  :
                  (
                    <div className='flex gap-4 lg:gap-8 '>  
                    <FaSearch 
                   onClick={() => setIsSearch(true)}
                  className='text-gray-500' size={30}

                  />

                  <NavLink to={'/home'} > 
                  <AiFillHome className='text-gray-500' size={30}/>
                  </NavLink>  
                  <BsFillBriefcaseFill className='text-gray-500' size={30}/>
                  <AiFillMessage className='text-gray-500' size={30}/>
                  
                    </div>
                  )
                 }
                 
                  
             </div>

             <div>      
                    <ProfileModal
                     currrentUser={currrentUser}
                      imgLink={currrentUser?.imglink}
                     />
             </div>
                           
         { searchInput.length === 0 ? 
         (
          <></>
         )  
         : 
        
         (
          <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user?.imglink} alt="" />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
        </div>
    </>
  )
}


// for profile section in navbar
export const ProfileModal=({imgLink,currrentUser})=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate=useNavigate()

  function handelClick()
  {
     navigate('/profile',{
        state:{
           id:currrentUser?.userId
        }
     })
  }


  return (
    <>
      <Button type='link' onClick={showModal} >
             
                   <img 
                     className='
                      w-12 h-12
                      rounded-full cursor-pointer transition-all duration-300 hover:scale-95'
                     src={imgLink}  alt="" 
                      />
                  
      </Button>
      <Modal 
      title="Profile" 
      open={isModalOpen} 
  
      onCancel={handleCancel}
     
      >
        <div className='flex  gap-3 items-center'>
           <img 
            className='w-10 h-10 object-cover rounded-full'
            src={imgLink} alt="/profile_img" />

            <p className='flex flex-col uppercase font-semibold'>
              <span>{currrentUser?.name}</span>
              <span>{currrentUser?.college}</span>
            </p>
        </div>
        <p className='mt-3 p-1'>
          <button 
          onClick={handelClick}
          className='w-full hover:bg-blue-700 transition-all duration-300 py-2 text-white font-medium bg-blue-500 rounded-md'>View Profile</button>
        </p>
          
          <div>
            <LogoutComponent/>
          </div>
      </Modal>
    </>
  );
};
