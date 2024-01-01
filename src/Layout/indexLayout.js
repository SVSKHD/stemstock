import { Navbar, Button, Container, Nav, Dropdown } from "react-bootstrap";
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
import user from "../assets/images/profile.png";
import logo from "../assets/images/logo.svg";
import { useRouter } from "next/router";

const StemIndexLayout = (props) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const { userData } = useSelector((state) => ({ ...state }));
  const StemLogout = () => {
    Router.push("/");
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
      type: "SET_FORGET_PASSWORD",
      payload: false,
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
      type: "SET_FORGET_PASSWORD",
      payload: false,
    });
    dispatch({
      type: "SET_AUTH_STATUS_VISIBLE",
      payload: false,
    });
  };
  return (
    <>
      <div>
        <StemAuthDialog />
        <Navbar bg="white" data-bs-theme="light" className="shadow-sm py-0">
          <Container>
            <Navbar.Brand href="/">
              <Image src={logo} className="w-100" alt="logo" />
            </Navbar.Brand>
            <Nav className="ms-auto">
              {userData ? (
                <Dropdown>
                  <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                    <span className="user-image me-3">
                      <Image src={user} width="50px" alt="Stem Fin" />
                      <span className="username fw-semibolds ms-3 text-start">
                        <span class="text-secondary small d-block">
                          Welcome
                        </span>
                        {userData.user.firstname}
                      </span>
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                    <Dropdown.Item href="/help">Help</Dropdown.Item>
                    <Dropdown.Item onClick={StemLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
            </Nav>
          </Container>
        </Navbar>
        {props.children}
      </div>
    </>
  );
};
export default StemIndexLayout;
