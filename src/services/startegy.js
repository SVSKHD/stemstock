import axios from "axios";

const startegySave = (data) => axios.post(`/api/strategy/create`, data);

const strategyFetch = (id) => axios.get(`/api/strategy/fetch?id=${id}`);

const strategyEdit = (id, data) =>
  axios.put(`/api/strategy/update?id=${id}`, data);

const strategyById = (id) => axios.get(`/api/strategy/strategy-id?id=${id}`);

const strategyDelete = (id) => axios.delete(`/api/strategy/delete?id=${id}`);

const strategyEnable = (data) => axios.put(`/api/strategy/status-update`, data);

const StrategyOperations = () => {
  return {
    startegySave,
    strategyEdit,
    strategyEnable,
    strategyDelete,
    strategyFetch,
    strategyById,
  };
};

export default StrategyOperations;
