import StemIndexLayout from "@/Layout/indexLayout";
import { Col, Row, Button, Container } from "react-bootstrap";
import Image from "next/image";
import Landingimg from "../assets/images/stem-landing.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import StemAuthDialog from "@/components/Auth/AuthDialog";

const StemHome = () => {
  const { userData } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleTrading = () => {
    if (!userData?.user) {
      dispatch({
        type: "SET_AUTH_DIALOG_VISIBLE",
        payload: true,
      });
    }
  };
  return (
    <>
      <StemIndexLayout>
        <StemAuthDialog />
        <section className="landing-sec py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={5}>
                <h6 className="text-secondary mb-0">Welcome To</h6>
                <h1 className="display-1 display4 fw-bold text-uppercase text-theme">
                  Stem FIN
                </h1>
                <p className="mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo.
                </p>
                <div className="mt-4">
                  <Button
                    variant="dark"
                    className="px-4 rounded-pill shoadow-sm"
                    onClick={handleTrading}
                  >
                    Start Trading <FaArrowRightLong />
                  </Button>
                </div>
              </Col>
              <Col md={7}>
                <Image src={Landingimg} alt="stemstock" className="w-100" />
              </Col>
            </Row>
          </Container>
        </section>
      </StemIndexLayout>
    </>
  );
};
export default StemHome;
