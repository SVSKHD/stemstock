import axios from "axios";

const startegySave = (data) => axios.post(`/api/strategy/create`, data);

const strategyFetch = (id) => axios.get(`/api/strategy/fetch?id=${id}`)

const strategyEdit = (id, data) => axios.put(`/api/startegy?id=${id}`, data);

const strategyDelete = (id) => axios.delete  (`/api/strategy/delete?id=${id}`);

const strategyEnable = (data) => axios.put(`/api/strategy/status-update`,data);

const StrategyOperations = () => {
  return {
    startegySave,
    strategyEdit,
    strategyEnable,
    strategyDelete,
    strategyFetch
  };
};

export default StrategyOperations;
