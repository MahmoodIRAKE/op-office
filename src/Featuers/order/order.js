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



  const ordersCollectionRef=collection(db,"orders");

  class OrdersService{
       counter=1;
        
       addOrder= async (order,setLoader,setShowError,setShowSucess)=>{
        this.counter=1;
        const orderToSave={...order,id:uuidv4(),
            createdAt:serverTimestamp(),
            lastUpdated:serverTimestamp(),
            active:true}
          try {
            setLoader(true)
            const orderRef = await addDoc(ordersCollectionRef, orderToSave);
            setLoader(false);
            setShowSucess(true);
            setTimeout(()=>{setShowSucess(false)},3000)
            return true;
          } catch (error) {
            setLoader(false);
            setShowError(true);
            setTimeout(()=>{setShowError(false)},3000)
            console.error("Add Order Error At Error Service -",error);
            return false;
          }
       }

       getAllOrders=async (setLoader,setOrders,setShowError)=>{
        try{
        this.counter=2
        setLoader(true) 
        const orders=(await getDocs(ordersCollectionRef)).docs;
        setOrders(orders.map((doc)=>({...doc.data(),id:doc.id})));
        setLoader(false);
        }catch(error){
         setLoader(false);
         setShowError(true);
         setTimeout(()=>{setShowError(false)},3000)
         console.error("Get All Orders  -",error);
        }

       }

       deleteOrder=async (setLoader,setOrder,setShowError,id)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const orderDoc = doc(db, "orders", id);
          const resut =deleteDoc(orderDoc);
          const orders=(await getDocs(ordersCollectionRef)).docs;
          setOrder(orders?.map((doc)=>({...doc.data(),id:doc.id})));
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("DeleteOrderssError  -",error);
          }
       }

       updateOrders=async (order,setLoader,setShowError,setShowSucess,id)=>{
        this.counter=2
        try{
         
          setLoader(true) 
          const orderDoc = doc(db, "orders", id);
          const updatedOrders= updateDoc(orderDoc, order);
          setLoader(false);
          }catch(error){
           setLoader(false);
           setShowError(true);
           setTimeout(()=>{setShowError(false)},3000)
           console.error("UpdateOrdersError  -",error);
          }
       }
       
       getByUserId=async (setLoader,setOrders,setShowError,userId)=>{
        try{
        this.counter=2
        setLoader(true) 
        // const orderDoc = doc(db, "orders", id);
        // return getDoc(bookDoc);
        const orders=(await getDocs(ordersCollectionRef)).docs;
        setOrders(orders.map((doc)=>({...doc.data(),id:doc.id})));
        setLoader(false);
        }catch(error){
         setLoader(false);
         setShowError(true);
         setTimeout(()=>{setShowError(false)},3000)
         console.error("Get All Orders  -",error);
        }

       }
  }
  export default new OrdersService();