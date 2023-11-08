import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import StemUserOperations from "./authOperations";
import StemToast from "../reusables/js/toast";

const StemSignin = () => {
  const { StemUserSignin } = StemUserOperations();
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    console.log("data", data);
    StemUserSignin(data)
      .then(() => {
        StemToast("Successfully Logged in" , "success");
      })
      .catch(() => {
        StemToast("Sorry please try again" , "error");
      });
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="enter your password"
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleSubmit} size="md">
            Signin
          </Button>
        </div>
      </Form>
    </>
  );
};
export default StemSignin;
