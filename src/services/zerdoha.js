import axios from "axios";

const zerodhaPlaceOrder = (data) => axios.post(`/api/zerodha/placeOrder`, data);
const zerodhaCloseOrder = (id, data) =>
  axios.post(`/api/zerodha/close-orderr?id=${id}`, data);
const zerodhaOperations = () => {
  return {
    zerodhaPlaceOrder,
    zerodhaCloseOrder,
  };
};

export default zerodhaOperations;
