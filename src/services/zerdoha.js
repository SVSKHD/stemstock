import axios from "axios";

const zerodhaPlaceOrder = (data) =>
  axios.post(`/api/zerodha/placeOrder`, data);
const zerodhaOperations = () => {
  return {
    zerodhaPlaceOrder,
  };
};

export default zerodhaOperations;
