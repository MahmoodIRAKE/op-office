import { v4 as uuidv4 } from 'uuid';
import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    addDoc,
  } from 'firebase/firestore';
import db from '../../api/firebase'



  const usersCollectionRef=collection(db,"users");

  class UsersService{
        counter=1;
        
       addUser= async (user,setLoader,setShowError,setShowSucess)=>{
        console.log(this)
        const userToSave={...user,id:uuidv4(),
            createdAt:serverTimestamp(),
            lastUpdated:serverTimestamp(),
            active:true}
          try {
            setLoader(true)
            const userRef = await addDoc(usersCollectionRef, userToSave);
            // await setDoc(userRef, userToSave);
            setLoader(false);
            setShowSucess(true);
            setTimeout(()=>{setShowSucess(false)},3000)
            return true;
          } catch (error) {
            setLoader(false);
            setShowError(true);
            setTimeout(()=>{setShowError(false)},3000)
            console.error("Add User Error At Error Service -",error);
            return false;
          }
       }

       getAllUsers=async (setLoader,setUsers,setShowError)=>{
        try{
        this.counter=2
        setLoader(true) 
        const users=(await getDocs(usersCollectionRef)).docs;
        setUsers(users.map((doc)=>({...doc.data(),id:doc.id})));
        setLoader(false);
        }catch(error){
         setLoader(false);
         setShowError(true);
         setTimeout(()=>{setShowError(false)},3000)
         console.error("Get All Users  -",error);
        }

       }

       deleteUsers=async (setLoader,setUsers,setShowError,id)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const userDoc = doc(db, "users", id);
          const resut =deleteDoc(userDoc);
          const users=(await getDocs(usersCollectionRef)).docs;
          setUsers(users.map((doc)=>({...doc.data(),id:doc.id})));
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("DeleteUsersError  -",error);
          }
       }

       updateUsers=async (user,setLoader,setShowError,setShowSucess,id)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const userDoc = doc(db, "users", id);
          const updatedUser= updateDoc(userDoc, user);
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("UpdateUsersError  -",error);
          }
       }
  }
  export default new UsersService();