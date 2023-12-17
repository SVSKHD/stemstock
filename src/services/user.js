import axios from "axios";
const forgotPassword = (data) => axios.post(`api/user/forgetPassword`, data);
const userUpdate = (id, data) => axios.put(`/api/user/update?id=${id}`, data);
const UserOperations = () => {
  return {
    forgotPassword,
    userUpdate,
  };
};
export default UserOperations;
