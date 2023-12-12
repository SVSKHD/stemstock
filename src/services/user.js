import axios from "axios";
const forgotPassword = (data) => axios.post(`api/user/forgetPassword`, data);
const UserOperations = () => {
  return {
    forgotPassword,
  };
};
export default UserOperations;
