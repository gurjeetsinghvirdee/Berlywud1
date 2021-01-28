import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart = (productId,price,qty=1) => async(dispatch,getState) =>{
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch({
        type: CART_ADD_ITEM , 
        payload : {
            product : data.id,
            brand : data.brand,
            title : data.title,
            price : price,
            url : data.url,
            stockcount : data.stockcount,
            qty: qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems))
}


export const removeFromCart = (product,price) => (dispatch,getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM , 
        payload : {
            product : product, 
            price :price
        } 
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems))
}