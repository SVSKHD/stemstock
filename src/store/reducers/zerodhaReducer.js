export const zerodhaReducer = (state = null, action) => {
    switch (action.type) {
      case "LOGGED_IN_ZERODHA":
        return action.payload;
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  };
  