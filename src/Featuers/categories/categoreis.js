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



  const categoryCollectionRef=collection(db,"categories");

  class CategoriesService{
       counter=1;
        
       addCategory= async (category,setLoader,setShowError,setShowSucess)=>{
        console.log(this)
        const categoryToSave={...category,id:uuidv4(),
            createdAt:serverTimestamp(),
            lastUpdated:serverTimestamp(),
            active:true}
          try {
            setLoader(true)
            const categoryRef = await addDoc(categoryCollectionRef, categoryToSave);
            setLoader(false);
            setShowSucess(true);
            setTimeout(()=>{setShowSucess(false)},3000)
            return true;
          } catch (error) {
            setLoader(false);
            setShowError(true);
            setTimeout(()=>{setShowError(false)},3000)
            console.error("Add Category Error At Error Service -",error);
            return false;
          }
       }

       getAllCategoreis=async (setLoader,setCategories,setShowError)=>{
        try{
        this.counter=2
        setLoader(true) 
        const categories=(await getDocs(categoryCollectionRef)).docs;
        setCategories(categories.map((doc)=>({...doc.data(),id:doc.id})));
        setLoader(false);
        }catch(error){
         setLoader(false);
         setShowError(true);
         setTimeout(()=>{setShowError(false)},3000)
         console.error("Get All Categoreis  -",error);
        }

       }

       deleteCategory=async (setLoader,setCategories,setShowError,id)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const categoryDoc = doc(db, "categories", id);
          const resut =deleteDoc(categoryDoc);
          const categories=(await getDocs(categoryCollectionRef)).docs;
          setCategories(categories.map((doc)=>({...doc.data(),id:doc.id})));
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("DeleteCategoriesError  -",error);
          }
       }

       updateCategories=async (category,setLoader,setShowError,setShowSucess,id)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const categoryDoc = doc(db, "categories", id);
          const updatedCategory= updateDoc(categoryDoc, category);
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("UpdateCategoriesError  -",error);
          }
       }
  }
  export default new CategoriesService();