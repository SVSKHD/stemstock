import { Container, Navbar, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useEffect } from "react";

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
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">StemNav</Navbar.Brand>
          {userData ? (
            <>
              <Navbar.Text className="text-bolder">Welcome Back : {userData.user.firstname}</Navbar.Text>
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
      </Navbar>
    </>
  );
};

export default StemNavBar;
