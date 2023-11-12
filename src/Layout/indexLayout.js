import { Navbar, Button, Container } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import StemAuthDialog from "@/components/Auth/AuthDialog";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Head from "next/head";

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
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <StemAuthDialog />
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
      </Navbar>
      {props.children}
    </>
  );
};
export default StemIndexLayout;
