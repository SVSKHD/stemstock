import StemIndexLayout from "@/Layout/indexLayout";
import { Col, Row, Button, Container } from "react-bootstrap";
import Image from "next/image";
import Landingimg from "../assets/images/stem-landing.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import StemAuthDialog from "@/components/Auth/AuthDialog";
import { useEffect } from "react";
import moment from "moment";
import StemToast from "@/components/reusables/js/toast";

const StemHome = () => {
  const { userData } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  function getTimeDifferenceInHours(startDate, endDate) {
    // Check if both dates are valid
    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
      console.error("Invalid date(s)");
      return NaN; // One or both dates are invalid
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const msPerHour = 1000 * 60 * 60;
    return Math.abs(end - start) / msPerHour;
  }

  useEffect(() => {
    console.log("time", moment(new Date()).format("YYYY-MM-DD HH:mm"));
    const loggedInTime = JSON.parse(sessionStorage.getItem("user"))?.time;
    const presentTime = moment(new Date()).format("YYYY-MM-DD HH:mm");
    const hours = getTimeDifferenceInHours(loggedInTime, presentTime);
    if (!loggedInTime) {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      sessionStorage.removeItem("user");
      StemToast("Logged Out", "error");
    } else if (hours >=6) {
      console.log("logout")
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      sessionStorage.removeItem("user");
    }else if(!userData){
      console.log("not logged in")
    }
  },[])
  const handleTrading = () => {
    if (!userData?.user) {
      dispatch({
        type: "SET_AUTH_DIALOG_VISIBLE",
        payload: true,
      });
    } else {
      console.log("err");
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
