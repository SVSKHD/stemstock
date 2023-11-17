import axios from "axios";

const startegySave = (data) => axios.post(`/api/startegy`, data);

const strategyEdit = (id, data) => axios.put(`/api/startegy?id=${id}`, data);

const startegyDelete = (id) => axios.delete * `/api/startegy?idel=${id}`;

const startegyEnable = () => axios.put(`/api/strategy`);

const StrategyOperations = () => {
  return {
    startegySave,
    strategyEdit,
    startegyEnable,
    startegyDelete,
  };
};

export default StrategyOperations;
