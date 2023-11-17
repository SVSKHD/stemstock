import StemIndexLayout from "@/Layout/indexLayout";
import { Col, Row, Button, Container, Navbar, Nav } from "react-bootstrap";
import Image from "next/image";
import Landingimg from "../assets/images/stem-landing.svg";
import { FaArrowRightLong, FaArrowRightToBracket, FaWpforms } from "react-icons/fa6";
import logo from "../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import StemAuthDialog from "@/components/Auth/AuthDialog";


const StemHome = () => {
  const dispatch = useDispatch()
  const {authDialog, signupStatus } = useSelector((state) => ({ ...state }));

  const handleSignupDialog = () =>{
    dispatch({
      type: "SET_AUTH_DIALOG_VISIBLE",
      payload: false,
    })
    dispatch({
      type: "SET_AUTH_STATUS_VISIBLE",
      payload: true,
    })
  }
  const handleSigninDialog = () =>{
    dispatch({
      type: "SET_AUTH_DIALOG_VISIBLE",
      payload: false,
    })
    dispatch({
      type: "SET_AUTH_STATUS_VISIBLE",
      payload: false,
    })
  }

  return (
    <>
        <Navbar bg="white" data-bs-theme="light" className="shadow-sm py-0">
          <Container>
            <Navbar.Brand href="#home"><Image src={logo} className="w-100" alt="logo"/></Navbar.Brand>
            <Nav className="ms-auto">
             
              <Button variant="outline-info" className="px-4 rounded-pill shoadow-sm" onClick={()=>handleSigninDialog()}><FaArrowRightToBracket /> Login</Button>
              <Button variant="info" className="px-4 rounded-pill shoadow-sm ms-3" onClick={()=>handleSignupDialog()}><FaWpforms /> Signup</Button>
              
              <Nav.Link href="#features">

              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <section className="landing-sec py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={5}>
                <h6 className="text-secondary mb-0">Welcome To</h6>
                <h1 className="display-1 display4 fw-bold text-uppercase text-theme">Stem STock</h1>
                <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                </p>
                <div className="mt-4">
                  <Button variant="dark" className="px-4 rounded-pill shoadow-sm">Start Trading <FaArrowRightLong /></Button>
                </div>
              </Col>
              <Col md={7}>
                <Image src={Landingimg} alt="stemstock" className="w-100"/>
              </Col>
            </Row>
          </Container>
        </section>
    </>
  );
};
export default StemHome;
