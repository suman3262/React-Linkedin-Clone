import { store } from "../firebase-config"
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc
} from 'firebase/firestore'

let deRef=collection(store,"posts");
let DeRef=collection(store,"users");
let likeRef=collection(store,"likes")
let commentsRef=collection(store,'comments')

export const postsApi=async (obj )=>{
    
    try {
        let res=await addDoc(deRef,obj);
        
    } catch (error) {
        console.log(error);
    }
    
}

export  const getStatus=(setPosts)=>{
  onSnapshot(deRef,(res)=>{

    setPosts( res.docs.map((doc)=>{
            return {
                ...doc.data(),id:doc.id
            }
        })) 
   
  })
}


export const getAlluser=(setAlluser)=>{
   
    onSnapshot(DeRef,(responce)=>{
      setAlluser(
        responce.docs.map((doc)=>{
          return {
            ...doc.data(),id:doc.id
          }
        })
      )
    })
}

export const postUser=async(obj)=>{

    try {
        let res=await addDoc(DeRef,obj);
          
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentUser=(setcurUser)=>{

    const currentEmail= localStorage.getItem('userEmail')
    onSnapshot(DeRef, (res)=>{
        setcurUser(  
     res.docs.map((docs)=>{
        return {...docs.data(), userId:docs.id}
    }).filter((item)=> item.email===currentEmail)[0]
    );
})

}

export const getProfileUser=(setUserdata,Email)=>{

    onSnapshot(DeRef, (res)=>{
        setUserdata(  
     res.docs.map((docs)=>{
        return {...docs.data(), userId:docs.id}
    }).filter((item)=> item.email===Email)[0]
    );
} )
}

export const editProfile=async (userId,data)=>{

    try{
        let userEdit= doc(DeRef,userId);
        await updateDoc(userEdit,data);
    }
    catch(error)
    {
        console.log(error);
    }
    

}
export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(deRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
      setAllStatus(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  };
  
  export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(DeRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
      setCurrentUser(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })[0]
      );
    });
  };

  export const likePost = (userId, postId, liked) => {
    try {
      let docToLike = doc(likeRef, `${userId}_${postId}`);
        if (liked) {
           deleteDoc(docToLike);
         }
       else {
        setDoc(docToLike, { userId, postId });
      }
    } 
    catch (err) {
      console.log(err);
    }
  };
  
  export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
      let likeQuery = query(likeRef, where("postId", "==", postId));
  
      onSnapshot(likeQuery, (response) => {
        let likes = response.docs.map((doc) => doc.data());
        let likesCount = likes?.length;
  
        const isLiked = likes.some((like) => like.userId === userId);
  
        setLikesCount(likesCount);
        setLiked(isLiked);
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const postComment = (postId, comment, timeStamp, name,id) => {
    try {
      addDoc(commentsRef, {
        postId,
        comment,
        timeStamp,
        name,
        id
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getComments = (postId, setComments) => {
    try {
      let singlePostQuery = query(commentsRef, where("postId", "==", postId));
  
      onSnapshot(singlePostQuery, (response) => {
        const comments = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
        setComments(comments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updatePost=(id,status)=>{

     let docToUpdate=doc(deRef,id);

      try{
        updateDoc(docToUpdate,{status})
      }
      
      catch(error){
        console.log(error);
      }
       
  };

  export const deletePost=(id)=>{

    let docToDelete=doc(deRef,id);

    try{
      deleteDoc(docToDelete);
    }
    
    catch(error){
      console.log(error);
    }


  };