import React, { useMemo, useState } from 'react'
import { editProfile } from '../../API/FireStore';
import { getComments } from '../../API/FireStore';

const EditProfile = ({setIsedit,curUser}) => {

    const [editInputs, setEditInputs] = useState(curUser);
    const getInput = (event) => {
      let { name, value } = event.target;
      let input = { [name]: value };
      setEditInputs({ ...editInputs, ...input });
    };
    
    // const[allComments,setAllcomments]=useState([]);

    // useMemo(()=>{
        
    //   getComments()
    // },[])


    function updateProfile(e)
    {

        e.preventDefault();
        editProfile(curUser.userId, editInputs);
    }
  return (
     <>
       <div 
       className='realtive w-full lg:w-[60%] mx-auto 
        mt-6 lg:mt-16 lg:min-h-[15rem] border-2  rounded-md'>
           <div className='w-full relative'>
              <button 
               onClick={()=>setIsedit()}
              className='m-2 rounded-lg text-white font-normal absolute top-0 right-0 bg-blue-600 px-8 py-3'>Back</button>
           </div>

           
          
        <div className='flex flex-col gap-2 w-[95%] mx-auto'>
        <label className='mt-10 text-xl font-medium'>Name</label>
        <input
          onChange={getInput}
          placeholder="Name"
          name="name"
          value={editInputs.name}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
        />
        <label className='text-xl font-medium'>Headline</label>
        <input
          onChange={getInput}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />

        <label className='text-xl font-medium'>Country</label>
        <input
          onChange={getInput}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />

        <label className='text-xl font-medium'>City</label>
        <input
          onChange={getInput}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          placeholder="City"
          name="city"
          value={editInputs.city}
        />

        <label className='text-xl font-medium'>Company</label>
        <input
          onChange={getInput}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          placeholder="Company"
          value={editInputs.company}
          name="company"
        />

        <label className='text-xl font-medium'>Industry </label>
        <input
          onChange={getInput}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />

        <label className='text-xl font-medium'>College</label>
        <input
          onChange={getInput}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          placeholder="College"
          name="college"
          value={editInputs.college}
        />

        <label className='text-xl font-medium'>Website</label>
        <input
          onChange={getInput}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />
        <label className='text-xl font-medium'>About</label>
        <textarea
          placeholder="About Me"
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />

        <label className='text-xl font-medium'>Skills</label>
        <input
          onChange={getInput}
          placeholder="Skill"
          name="skills"
          value={editInputs.skills}
          className='border-[0.5px] text-lg mb-2 py-1 border-blue-600 rounded-md outline-none pl-2'
        />
      </div>
      <div className="">
        <button 
        className="bg-blue-600 px-5 py-2 rounded-md outline-none ml-1 my-2 text-white font-medium" 
        onClick={updateProfile}>
          Save
        </button>
      </div>
        </div>
    </>
  )
}

export default EditProfile
