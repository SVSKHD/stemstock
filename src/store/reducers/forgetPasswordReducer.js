export const forgetPasswordReducer = (state = false, action) => {
    switch (action.type) {
      case "SET_FORGET_PASSWORD":
        return action.payload;
      default:
        return state;
    }
  };
  