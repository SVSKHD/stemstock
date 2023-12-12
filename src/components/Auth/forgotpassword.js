import { useState } from "react";
import StemInput from "../reusables/input";
import { Button } from "react-bootstrap";
import UserOperations from "@/services/user";
import StemToast from "../reusables/js/toast";
import { useDispatch } from "react-redux";

const StemForgetPassword = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [disable, setDisable] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const { forgotPassword } = UserOperations();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleConfirmation = async () => {
    const requestData = { email: data.email };
    await forgotPassword(requestData)
      .then((res) => {
        setDisable(true);
        setShowPasswordInput(true);
        console.log(res);
        StemToast(`${res.data.message}`);
      })
      .catch((err) => {
        setDisable(false);
        setShowPasswordInput(false);
        StemToast(`${err.response?.data.error}`, "error");
      });
  };

  const handleFinalPassword = async () => {
    if (showPasswordInput === true) {
      await forgotPassword(data)
        .then((res) => {
          console.log(res);
          StemToast(`Succesfully updated`);
          dispatch({
            type: "SET_FORGET_PASSWORD",
            payload: false,
          });
        })
        .catch((err) => {
          setDisable(false);
          setShowPasswordInput(false);
          StemToast(`${err.response?.data.error}`, "error");
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <StemInput
            label="Please enter your email"
            value={data.email}
            handleChange={handleChange}
            disabled={disable}
            type="email"
            name="email"
          />
          {showPasswordInput ? (
            <StemInput
              label="Please enter your desired password"
              value={data.password}
              handleChange={handleChange}
              type="password"
              name="password"
            />
          ) : (
            <div />
          )}
          {showPasswordInput ? (
            <Button variant="secondary" onClick={handleFinalPassword}>
              Update Password
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleConfirmation}>
              Confirm Email
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default StemForgetPassword;
