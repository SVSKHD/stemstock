export const simpleReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_DRAWER_VISIBLE":
      return action.payload;
    default:
      return state;
  }
};
