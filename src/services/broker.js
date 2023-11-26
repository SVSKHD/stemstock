import axios from "axios";

const BrokerCreate = (data) => axios.post("/api/broker/create", data);

const BrokerFetch = (id) => axios.get(`/api/broker/fetch?id=${id}`);

const BrokerUpdate = (id, data) =>
  axios.put(`/api/broker/update?id=${id}`, data);

const BrokerOperations = () => {
  return {
    BrokerCreate,
    BrokerFetch,
    BrokerUpdate
  };
};
export default BrokerOperations;
