import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import StemUserOperations from "./authOperations";
import StemToast from "../reusables/js/toast";
import { useDispatch } from "react-redux";

const StemSignup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    retypePassword: "",
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const [error, setError] = useState(false);
  const { StemUserSignup } = StemUserOperations();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (data.password === data.retypePassword) {
      StemToast("Password has matched", "success");
      const { retypePassword, ...dataToSubmit } = data;
      console.log(dataToSubmit);
      await StemUserSignup(dataToSubmit)
        .then(() => {
          StemToast("Succesfull", "success");
          dispatch({
            type: "SET_AUTH_STATUS_VISIBLE",
            payload: false,
          });
        })
        .catch(() => {
          StemToast("please try again", "error");
        });
    }
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your First Name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your Last Name"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="number"
            placeholder="enter Phone no"
            value={data.phoneNo}
            onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Retype-Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="retype password"
            value={data.retypePassword}
            onChange={(e) =>
              setData({ ...data, retypePassword: e.target.value })
            }
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button onClick={handleSubmit} variant="primary" size="md">
            Signup
          </Button>
        </div>
      </Form>
    </>
  );
};
export default StemSignup;
