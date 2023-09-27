
import { useState, useEffect } from "react";
import '../../pages/style.css'
import {  useDispatch } from 'react-redux'
import { addToQty ,removeProdut,removeQty} from "../../Featuers/orderslice";


export function CartCard({product,item}) {
    const dispatch = useDispatch()
   
  

  return (
    <div className="cart-container">
    
            
         <img src={product?.image} alt={'product'} className="image-card" />
         <div className="info-card">
             <div className="info-card-inside">
                <div className="title">
                    {product?.name} 
                </div>
                <div className="product-desc">
                    {product?.desc} 
                </div>
             </div>
             <div className="action-card-inside">
                <button className="qt-minus" onClick={()=>dispatch(removeQty(product.id))}>-</button>
                <span className="qt">{item?.productQy}</span>
                <button className="qt-plus" onClick={()=>dispatch(addToQty(product.id))}>+</button>
                <button className="qt-plus" onClick={()=>dispatch(removeProdut(product.id))}>Remove</button>
             </div>
         </div>
        
    </div>
  );
}

