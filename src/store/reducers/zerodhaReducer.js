const initialState = {
  requestToken: null,
  accessToken: null
};

export const zerodhaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN_ZERODHA":
      // Assuming action.payload contains the access token
      return {
        ...state,
        accessToken: action.payload
      };
    case "STORE_REQUEST_TOKEN":
      // Assuming action.payload contains the request token
      return {
        ...state,
        requestToken: action.payload
      };
    case "LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};