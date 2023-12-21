export const brokerStatusReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_AUTH_STATUS_VISIBLE":
      return action.payload;
    default:
      return state;
  }
};
