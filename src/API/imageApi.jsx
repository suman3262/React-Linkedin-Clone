import { storage } from "../firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FireStore";

// export const uploadImage = (
//   file,
//   id,
//   setModalOpen,
//   setProgress,
//   setCurrentImage
// ) => {
//   const profilePicsRef = ref(storage, `profileImages/${file.name}`);
//   const uploadTask = uploadBytesResumable(profilePicsRef, file);

//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );

//       setProgress(progress);
//     },
//     (error) => {
//       console.error(err);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((response) => {
//         editProfile(id, { imageLink: response });
//         setModalOpen(false);
//         setCurrentImage({});
//         setProgress(0);
//       });
//     }
//   );
// };

export const uploadPostImage = (file, id,setProgress) => {
  const postPicsRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

     // set the image uplaod progress 
    setProgress(progress)
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        
        editProfile(id,{imglink:response});
      });
    }
  );
};