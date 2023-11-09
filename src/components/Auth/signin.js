import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import StemUserOperations from "./authOperations";
import StemToast from "../reusables/js/toast";
import { useDispatch, useSelector } from "react-redux";

const StemSignin = () => {
  const dispatch = useDispatch();
  const { StemUserSignin } = StemUserOperations();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ type: false, message: [] });

  const { userData } = useSelector((state) => ({ ...state }));

  const handleSubmit = () => {
    setLoading(true);
    StemUserSignin(data)
      .then((res) => {
        StemToast("Successfully Logged in", "success");
        setTimeout(() => setLoading(false), 3000);
        setTimeout(() => setSuccess(true), 3000);
        console.log("user", res.data, userData);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        setTimeout(
          () =>
            dispatch({
              type: "SET_AUTH_DIALOG_VISIBLE",
              payload: false,
            }),
          5000
        );
      })
      .catch(() => {
        StemToast("Sorry please try again", "error");
        setTimeout(() => setLoading(false), 3000);
      });
  };
  return (
    <>
      {success ? (
        <div className="text-center m-4">
          <svg
            class="fsw-success-checkmark-container"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <circle
              class="fsw-success-checkmark-outline-stroke"
              cx="50"
              cy="50"
              r="40"
              fill="none"
            />
            <circle
              class="fsw-success-checkmark-outline-fill"
              cx="50"
              cy="50"
              r="42"
            />
            <circle
              class="fsw-success-checkmark-outline-rotate"
              cx="50"
              cy="50"
              r="46"
              fill="none"
            />

            <path
              class="fsw-success-checkmark-line-stroke"
              d="M32 48 L45 63 L70 33"
              fill="none"
            />
            <path
              class="fsw-success-checkmark-line-shake"
              d="M32 48 L45 63 L70 33"
              fill="none"
            />
          </svg>
        </div>
      ) : (
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
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Signin"
              )}
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};
export default StemSignin;
