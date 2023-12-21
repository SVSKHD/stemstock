import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import StemUserOperations from "./authOperations";
import StemToast from "../reusables/js/toast";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Signupimg from "../../assets/images/signup.png";
import { FaUserShield } from "react-icons/fa6";
import StemInput from "../reusables/input";

const StemSignup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    retypePassword: "",
  });
  const { StemUserSignup } = StemUserOperations();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (data.password === data.retypePassword) {
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
        .catch((err) => {
          console.log(err?.response.data);
          StemToast(`${err?.response.data}`, "error");
        });
    }
  };
  return (
    <>
      <Row class="d-flex align-items-center">
        <Col md={6}>
          <Image src={Signupimg} alt="Signup" className="w-100 h-auto" />
        </Col>
        <Col md={6}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="mb-0">Firstname:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your First Name"
                    value={data.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="mb-0">Lastname:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Last Name"
                    value={data.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mb-0">Phone No:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone no"
                value={data.phoneNo}
                onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mb-0">Email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <StemInput
                  label="Password:"
                  type="password"
                  placeholder="Enter your password"
                  value={data.password}
                  handleChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <StemInput
                  label="Re-Type Password"
                  type="password"
                  placeholder="Retype password"
                  value={data.retypePassword}
                  handleChange={(e) =>
                    setData({ ...data, retypePassword: e.target.value })
                  }
                />
              </Col>
            </Row>

            <div className="d-grid gap-2">
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="md"
                className="w-auto rounded-pill px-4 d-flex align-items-center me-auto mt-3"
              >
                <FaUserShield /> &nbsp; Signup
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default StemSignup;
