import { createSlice } from '@reduxjs/toolkit'
import { ORDER_PAYMENT_STATUS,ORDER_STATUS,DELIVERY_STATUS } from './orderConstants';

export const cartSlice = createSlice({
  name: 'order',
  initialState: {
    id:'',
    createdAt:'',
    updatedAt:'',
    Active:true,
    products:[],
    deliveryStatus:'',
    estimatedDeliveryDate:'',
    orderStatus:'',
    userId:'',
    paymentStatus:'',
    paymentMethod:'',
    paymentDate:'',
    paymanetId:'',
    deliveryId:'',
    signed:false,
    price:0
  },
  reducers: {
    addToCart:(state,action)=>{
        const product=action.payload;
        if(product){
            const checkProduct=state.products.findIndex(a=>a.productId===product.id)
           
            if(checkProduct>=0){
                state.products[checkProduct].productQy+=1;
            }
            else{
                state.products.push({productId:product.id,productQy:1});
            }
        }
      
    },
    addToQty:(state,action)=>{
      const productId=action.payload;
      if(productId){
        const checkProduct=state.products.findIndex(a=>a.productId===productId)
           
        if(checkProduct>=0){
            state.products[checkProduct].productQy+=1;
        }
   
      }
    
    },
    removeQty:(state,action)=>{

      const productId=action.payload;
      if(productId){
        const checkProduct=state.products.findIndex(a=>a.productId===productId)
           
        if(checkProduct>=0){
            if(state.products[checkProduct].productQy>1){
            state.products[checkProduct].productQy-=1;
            }
            else{
              state.products.splice(checkProduct, 1)
            }
        }
   
      }
    },
    removeProdut:(state,action)=>{

      const productId=action.payload;
      if(productId){
        const checkProduct=state.products.findIndex(a=>a.productId===productId)
           
        if(checkProduct>=0){
    
              state.products.splice(checkProduct, 1)
            
        }
   
      }
    },
    initilaizeOrder:(state,action)=>{
       state.deliveryStatus=DELIVERY_STATUS[0]
       state.paymentStatus=ORDER_PAYMENT_STATUS[0]
       state.userId=action.payload
       state.orderStatus=ORDER_STATUS[0]
      
    },
    emptyOrder:(state,action)=>{
state.products=[]
state.userId=''
   },
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,addToCart,addToQty,removeProdut,removeQty, initilaizeOrder,emptyOrder } = cartSlice.actions

export default cartSlice.reducer