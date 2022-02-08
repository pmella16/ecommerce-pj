import { ADD_TO_CART, REMOVE_FROM_CART, START_ADD_TO_CART, FINISH_ADD_TO_CART, MINUS_CART_QUANTITY, PLUS_CART_QUANTITY } from "../actions/actionTypes";

const initialState = {
  cart: [],
  showModal: false,
  total: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_ADD_TO_CART: {

      return {
        ...state,
        showModal: true
      };
    }
    case ADD_TO_CART: {

      return {
        ...state,
        cart: [ ...state.cart,  action.payload ],
        total: state.total + (action.payload.price * action.payload.quantity)
      };
    }
    case FINISH_ADD_TO_CART: {

      return {
        ...state,
        showModal: false
      };
    }
    case REMOVE_FROM_CART: {
      const { id, price, quantity } = action.payload;

      return {
        ...state,
        total: state.total - ( price * quantity),
        cart: state.cart.filter((product) => product.id != id)
      };
    }
    case PLUS_CART_QUANTITY: {
      const { id, price } = action.payload;

      return {
        ...state,
        total: state.total + price,
        cart: state.cart.map(
          (product) => product.id === id ? {...product, quantity: product.quantity + 1}
                                           : product
      )
      };
    }
    case MINUS_CART_QUANTITY: {
      const { id, price, quantity } = action.payload;

      return {
        ...state,
        total: quantity > 1 ? state.total - price : state.total,
        cart: state.cart.map(
          (product) => product.id === id ? {...product, quantity: product.quantity - 1}
                                           : product
      )
      };
    }

    default:
      return state;
  }
}
