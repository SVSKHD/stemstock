import axios from "axios";

const zerodhaPlaceOrder = (data) => axios.post(`/api/zerodha/placeOrder`, data);
const zerodhaCloseOrder = (data) =>
  axios.post(`/api/zerodha/close-order`, data);
const zerodhaOperations = () => {
  return {
    zerodhaPlaceOrder,
    zerodhaCloseOrder
  };
};

export default zerodhaOperations;
