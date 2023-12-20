import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useState } from "react";
import StemUserOperations from "./authOperations";
import StemToast from "../reusables/js/toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Signinimg from "../../assets/images/signin.png";
import { FaUserShield } from "react-icons/fa6";
import moment from "moment";
import StemInput from "../reusables/input";

const StemSignin = () => {
  const dispatch = useDispatch();
  const { StemUserSignin } = StemUserOperations();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ type: false, message: [] });

  const Router = useRouter();

  const { userData } = useSelector((state) => ({ ...state }));

  const setSessionUser = (key, data) => {
    const flattenData = {
      data: data,
      time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    };
    sessionStorage.setItem(key, JSON.stringify(flattenData));
  };

  const handleSubmit = () => {
    setLoading(true);
    StemUserSignin(data)
      .then((res) => {
        StemToast("Successfully Logged in", "success");
        setTimeout(() => setLoading(false), 3000);
        setTimeout(() => setSuccess(true), 3000);
        setSessionUser("user", res.data);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        dispatch({
          type: "SET_AUTH_DIALOG_VISIBLE",
          payload: false,
        });
        Router.push("/dashboard");
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
        <Row className="align-items-center">
          <Col md={6}>
            <Image src={Signinimg} alt="Signin" className="w-100 h-auto" />
          </Col>
          <Col md={6}>
            <Form>
              <StemInput
                label="Email Address:"
                type="email"
                value={data.email}
                handleChange={(e) =>
                  setData({ ...data, email: e.target.value })
                }
                placeholder="Name@example.com"
              />
              <StemInput
                type="password"
                label="Password"
                value={data.password}
                handleChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
                placeholder="Enter your password"
              />
              <Form.Text id="passwordHelpBlock" muted>
                <span
                  onClick={() =>
                    dispatch({
                      type: "SET_FORGET_PASSWORD",
                      payload: true,
                    })
                  }
                >
                  forgot Password..?
                </span>
              </Form.Text>
              <div className="d-grid gap-2">
                <Button
                  variant="success w-auto rounded-pill px-4 d-flex align-items-center me-auto mt-3"
                  onClick={handleSubmit}
                  size="md"
                >
                  <FaUserShield /> &nbsp;
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};
export default StemSignin;
