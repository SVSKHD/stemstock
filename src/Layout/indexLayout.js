import { Navbar, Button, Container, Nav } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import StemAuthDialog from "@/components/Auth/AuthDialog";
import {
  FaArrowRightFromBracket,
  FaArrowRightLong,
  FaArrowRightToBracket,
  FaWpforms,
} from "react-icons/fa6";
import Image from "next/image";

import logo from "../assets/images/logo.svg";

const StemIndexLayout = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => ({ ...state }));
  const StemLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.removeItem("user");
  };
  const handleSignupDialog = () => {
    dispatch({
      type: "SET_AUTH_DIALOG_VISIBLE",
      payload: true,
    });
    dispatch({
      type: "SET_AUTH_STATUS_VISIBLE",
      payload: true,
    });
  };
  const handleSigninDialog = () => {
    dispatch({
      type: "SET_AUTH_DIALOG_VISIBLE",
      payload: true,
    });
    dispatch({
      type: "SET_AUTH_STATUS_VISIBLE",
      payload: false,
    });
  };
  return (
    <>
      <StemAuthDialog />
      {/* <Navbar bg="dark" data-bs-theme="dark">
        <StemAuthDialog />
        <Navbar bg="white" data-bs-theme="light" className="shadow-sm py-0">
          <Container>
            <Navbar.Brand href="#home">
              <Image src={logo} className="w-100" alt="logo" />
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Button
                variant="outline-info"
                className="px-4 rounded-pill shoadow-sm"
                onClick={() =>
                  dispatch({
                    type: "SET_AUTH_DIALOG_VISIBLE",
                    payload: false,
                  })
                }
              >
                <FaArrowRightToBracket /> Login
              </Button>
              <Button
                variant="info"
                className="px-4 rounded-pill shoadow-sm ms-3"
                onClick={() => handleSignupDialog()}
              >
                <FaWpforms /> Signup
              </Button>

              <Nav.Link href="#features"></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <Navbar.Brand href="/">StemNav</Navbar.Brand>
          {userData ? (
            <>
              <Navbar.Text>
                welcome back-
                <span className="text-bold">{userData.user.firstname}</span>
              </Navbar.Text>
              <Button onClick={StemLogout}>
                <FaArrowRightFromBracket size={25} />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-light"
                onClick={() =>
                  dispatch({
                    type: "SET_AUTH_DIALOG_VISIBLE",
                    payload: true,
                  })
                }
              >
                <FaUserAlt size={25} />
              </Button>
            </>
          )}
        </Container>
      </Navbar> */}
      <Navbar bg="white" data-bs-theme="light" className="shadow-sm py-0">
        <Container>
          <Navbar.Brand href="/">
            <Image src={logo} className="w-100" alt="logo" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            {userData ? (
              <></>
            ) : (
              <>
                <Button
                  variant="outline-info"
                  className="px-4 rounded-pill shoadow-sm"
                  onClick={() => handleSigninDialog()}
                >
                  <FaArrowRightToBracket /> Login
                </Button>
                <Button
                  variant="info"
                  className="px-4 rounded-pill shoadow-sm ms-3"
                  onClick={() => handleSignupDialog()}
                >
                  <FaWpforms /> Signup
                </Button>
              </>
            )}

            <Nav.Link href="#features"></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {props.children}
    </>
  );
};
export default StemIndexLayout;
