import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    id:'',
    createdAt:'',
    updatedAt:'',
    Active:true,
    products:[{productId:'',productQy:0}],
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
  },
  reducers: {
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
export const { increment, decrement, incrementByAmount } = orderSlice.actions

export default orderSlice.reducer