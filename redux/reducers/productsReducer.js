import { GET_PRODUCTS, GET_DETAIL, START_GET_PRODUCTS, START_GET_DETAIL } from "../actions/actionTypes";

const initialState = {
  products: [],
  productDetail: [],
  loadingAll: true,
  loadingDetail: true,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case START_GET_PRODUCTS: {

      return {
        ...state,
        loadingAll: true,
      };
    }
    case GET_PRODUCTS: {

      return {
        ...state,
        products: action.payload,
        loadingAll: false,
      };
    }
    case START_GET_DETAIL: {

      return {
        ...state,
        loadingDetail: true,
      };
    }
    case GET_DETAIL: {

      return {
        ...state,
        productDetail: [action.payload],
        loadingDetail: false
      };
    }
    default:
      return state;
  }
}
