import axios from "axios";

const StemUserSignup = (data) => axios.post(`/api/user/signup`, data);

const StemUserSignin = (data) => axios.post(`/api/user/login`, data);

const StemUserForgetPassword = () => axios.post(`/api/user/forgetPassword`);

const StemUserOperations = () => {
  return {
    StemUserSignin,
    StemUserSignup,
    StemUserForgetPassword,
  };
};

export default StemUserOperations;
