import axios from "axios";

const zerodhaPlaceOrder = (id, data) => axios.post(`/api/zerodha/placeOrder?id=${id}`, data);
const zerodhaOperations = () => {
  return {
    zerodhaPlaceOrder,
  };
};

export default zerodhaOperations;
