import { configureStore } from '@reduxjs/toolkit'
import orderslice from './orderslice'
import orders from './orders'

export default configureStore({
  reducer: {order:orderslice,orders},
})