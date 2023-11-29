import StemLayout from "@/Layout/Layout";
import ZerodhaBrokerForm from "@/components/forms/zerodhaBrokerForm";
import StemToast from "@/components/reusables/js/toast";
import BrokerOperations from "@/services/broker";
import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const StemBrokerComponent = () => {
  const { userData } = useSelector((state) => ({ ...state }));
  const [brokerDetails, setBrokerDetails] = useState({
    clientId: "",
    apiKey: "",
    apiSecret: "",
    user: userData ? userData.user.id : "",
  });
  const [id, setId] = useState(false);
  const [data, setData] = useState({});
  const [mode, setMode] = useState("create");

  const { BrokerCreate, BrokerFetch, BrokerUpdate } = BrokerOperations();

  useEffect(() => {
    if (userData) {
      BrokerFetch(userData ? userData.user.id : "")
        .then((res) => {
          setId(true);
          if (res.data === null) {
            setId(false);
          } else {
            setData(res.data);
          }
        })
        .catch((err) => {
          setId(false);
          console.log("err", err);
        });
    }
  }, [BrokerFetch , userData]);

  const handleChange = (e) => {
    setBrokerDetails({
      ...brokerDetails, // Spread the current state
      [e.target.name]: e.target.value, // Update the specific field
    });
  };

  const Reload = () => {
    BrokerFetch(userData ? userData.user.id : "")
      .then((res) => {
        setId(true);
        setData(res.data);
      })
      .catch(() => {
        setId(false);
      });
  };

  const handleSubmit = () => {
    if (mode === "edit") {
      BrokerUpdate(userData ? userData.user.id : "", brokerDetails)
        .then(() => {
          setId(true);
          StemToast("succesfully updated");
          Reload();
        })
        .catch((err) => {
          StemToast(err.message, "error");
        });
    } else if (mode === "create") {
      BrokerCreate(brokerDetails)
        .then((res) => {
          setId(true);
          setData(res.data);
          Reload();
        })
        .catch((err) => {
          setId(false);
        });
    }
  };

  const handleEdit = () => {
    BrokerFetch(userData ? userData.user.id : "")
      .then((res) => {
        if (res.data) {
          setMode("edit");
          setBrokerDetails({
            clientId: data.clientId || "",
            apiKey: data.apiKey || "",
            apiSecret: data.apiSecret || "",
            user: data.user || (userData ? userData.user.id : ""),
          });
        }
        setId(false);
      })
      .catch((err) => {
        setId(true);
        console.log("error", err);
      });
  };

  return (
    <>
      <StemLayout>
        <Row>
          {id ? (
            <>
              <Col>
                <h4>Clinet ID : {data ? data.clientId : ""}</h4>
                <h5>api key and api secret are encrypted</h5>
                <Button variant="dark" onClick={handleEdit}>
                  <FaEdit size={25} />
                </Button>
              </Col>
            </>
          ) : (
            <Col md={5}>
              <ZerodhaBrokerForm
                brokerDetails={brokerDetails}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                mode={mode}
              />
            </Col>
          )}
          <Col md={{ span: 5, offset: 2 }}>
            <p className="fw-bold mt-5">
              Find any difficulty?{" "}
              <span className="fw-normal text-secondary">
                Follow the Setup Tutorial
              </span>
            </p>

            <iframe
              width="100%"
              height="250px"
              className="rounded-4"
              src="https://www.youtube.com/embed/dV00JxVDBdk?si=KgnbE4k434Q44ZD8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Col>
        </Row>
      </StemLayout>
    </>
  );
};
export default StemBrokerComponent;
