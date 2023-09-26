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



  const productsCollectionRef=collection(db,"products");
//   const imagesListRef = ref(storage, "images/");

  class ProdctsService{
        counter=1;
        
       addProduct= async (product,setLoader,setShowError,setShowSucess,images)=>{
        console.log(this)
        const productToSave={...product,id:uuidv4(),
            createdAt:serverTimestamp(),
            lastUpdated:serverTimestamp(),
            image:images[0],
            active:true}
          try {
            setLoader(true)
            const productRef = await addDoc(productsCollectionRef, productToSave);
            // await setDoc(userRef, userToSave);
            setLoader(false);
            setShowSucess(true);
            setTimeout(()=>{setShowSucess(false)},3000)
            return true;
          } catch (error) {
            setLoader(false);
            setShowError(true);
            setTimeout(()=>{setShowError(false)},3000)
            console.error("Add Product Error At Error Service -",error);
            return false;
          }
       }

       getAllProducts=async (setLoader,setProducts,setShowError)=>{
        try{
        this.counter=2
        setLoader(true) 
        const products=(await getDocs(productsCollectionRef)).docs;
        setProducts(products.map((doc)=>({...doc.data(),id:doc.id})));
        setLoader(false);
        }catch(error){
         setLoader(false);
         setShowError(true);
         setTimeout(()=>{setShowError(false)},3000)
         console.error("Get All Products  -",error);
        }

       }

       deleteProducts=async (setLoader,setProducts,setShowError,id)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const productDoc = doc(db, "products", id);
          const resut =deleteDoc(productDoc);
          const products=(await getDocs(productsCollectionRef)).docs;
          setProducts(products.map((doc)=>({...doc.data(),id:doc.id})));
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("DeleteProductsError  -",error);
          }
       }

       updateProducts=async (product,setLoader,setShowError,setShowSucess,id,images)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const productDoc = doc(db, "products", id);
          const updatedProduct= updateDoc(productDoc, product);
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("UpdateProductsError  -",error);
          }
       }
    //    uploadImage=async(setImageUrl,imageUpload,)=>{
       
    //     const uploadFile = () => {
    //       if (imageUpload == null) return;
    //       const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    //       uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //         getDownloadURL(snapshot.ref).then((url) => {
    //           setImageUrls((prev) => [...prev, url]);
    //         });
    //       });
    //     };
    //    }
  }
  export default new ProdctsService();