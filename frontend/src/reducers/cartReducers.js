import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

const cartInitialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: ''
}
export const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload
      const existItem = state.cartItems.find(x => x._id === newItem._id)
      if (existItem) {
        // If item added already exists in cartItems, we patch it.
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x._id === existItem._id ? newItem : x
          )
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem]
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload)
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    default:
      return state
  }
}
