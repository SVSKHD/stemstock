import { Container, Navbar, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useEffect } from "react";
import Image  from "next/image";
import logo from "../assets/images/logo.svg"
import user from "../assets/images/profile.png"

const StemNavBar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => ({ ...state }));

  const StemLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="py-0 shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/" className="border-end border-light-subtle">
            <Image src={logo}  className="w-100"/>
          </Navbar.Brand>
          {userData ? (
            <>
              {/* <Navbar.Text className="text-bolder">Welcome Back : {userData.user.firstname}</Navbar.Text>
              <Button onClick={StemLogout}>
                <FaArrowRightFromBracket size={25} />
              </Button> */}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <span className="user-image me-3">
                  <Image src={user} width="50px"/>  
                  <span className="username fw-semibolds ms-3 text-start"><span class="text-secondary small d-block">Welcome</span>Hitesh Svsk</span>
                </span> 
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Help</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
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
