import { Container, Navbar, Dropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
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
      <Navbar bg="light" data-bs-theme="light" className="py-0 shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/" className="border-end border-light-subtle">
            <Image src={logo} className="w-100" alt="Stem Fin" />
          </Navbar.Brand>
          {userData ? (
            <>
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
              <Button
                className="outline-theme btn"
                onClick={() =>
                  dispatch({
                    type: "SET_AUTH_DIALOG_VISIBLE",
                    payload: true,
                  })
                }
              >
                Login
              </Button>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default StemNavBar;
