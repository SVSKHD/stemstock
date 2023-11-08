import { Navbar, Button, Container } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import StemAuthDialog from "@/components/Auth/AuthDialog";

const StemIndexLayout = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <StemAuthDialog/>
        <Container>
          <Navbar.Brand href="/">StemNav</Navbar.Brand>
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
        </Container>
      </Navbar>
      {props.children}
    </>
  );
};
export default StemIndexLayout;
