import { Container, Navbar, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useEffect } from "react";
import Image from "next/image";
import logo from "../assets/images/logo.svg";
import user from "../assets/images/profile.png";
import { useRouter } from "next/router";

const StemNavBar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const StemLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    router.push("/");
  };

  return (
    <>
     {/* <Navbar bg="white" data-bs-theme="light" className="shadow-sm">
          <Container>
            <Navbar.Brand href="#home"><Image src={logo} className="w-100" alt="logo"/></Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="#home">
              <Button variant="outline-info" className="px-4 rounded-pill shoadow-sm"><FaArrowRightToBracket /> Login</Button>
              <Button variant="info" className="px-4 rounded-pill shoadow-sm ms-3"><FaWpforms /> Signup</Button>
              </Nav.Link>
              <Nav.Link href="#features">

              </Nav.Link>
            </Nav>
          </Container>
        </Navbar> */}
      <Navbar bg="light" data-bs-theme="light" className="py-0 shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/" className="border-end border-light-subtle">
            <Image src={logo} className="w-100"  alt="Stem Fin"/>
          </Navbar.Brand>
          {userData ? (
            <>
              {/* <Navbar.Text className="text-bolder">Welcome Back : {userData.user.firstname}</Navbar.Text>
              <Button onClick={StemLogout}>
                <FaArrowRightFromBracket size={25} />
              </Button> */}
              <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                  <span className="user-image me-3">
                    <Image src={user} width="50px" alt="Stem Fin" />
                    <span className="username fw-semibolds ms-3 text-start">
                      <span class="text-secondary small d-block">Welcome</span>
                      {userData.user.firstname}
                    </span>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/help">Help</Dropdown.Item>
                  <Dropdown.Item onClick={StemLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <button
                className="outline-theme btn"
                onClick={() =>
                  dispatch({
                    type: "SET_AUTH_DIALOG_VISIBLE",
                    payload: true,
                  })
                }
              >
                Login
              </button>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default StemNavBar;
