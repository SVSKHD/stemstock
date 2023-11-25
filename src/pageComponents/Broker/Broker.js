import StemLayout from "@/Layout/Layout";
import BrokerOperations from "@/services/broker";
import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
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
  
  const { BrokerCreate, BrokerFetch } = BrokerOperations();

  useEffect(() => {
    if (userData) {
      BrokerFetch(userData ? userData.user.id : "")
        .then((res) => {
          setId(true);
          setData(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [BrokerFetch]);

  const handleChange = (e) => {
    // Use the name of the input field to identify which part of the state to update
    setBrokerDetails({
      ...brokerDetails, // Spread the current state
      [e.target.name]: e.target.value, // Update the specific field
    });
  };

  const handleSubmit = () => {
    console.log("save", brokerDetails);
  };

  return (
    <>
      <StemLayout>
        {id ? (
          <>
            <h4>Clinet ID : {data.clientId}</h4>
            <h5>api key and api secret are encrypted</h5>
          </>
        ) : (
          <Row>
            <Col md={5}>
              <h3>Zerodha Setup</h3>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Enter your client ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientId"
                    placeholder="Client ID"
                    value={brokerDetails.clientId}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Enter API Key</Form.Label>
                  <Form.Control
                    type="text"
                    name="apikey"
                    placeholder="API Key"
                    value={brokerDetails.apikey}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Enter API Secret</Form.Label>
                  <Form.Control
                    type="text"
                    name="apiSecret"
                    placeholder="API Secret"
                    value={brokerDetails.apiSecret}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </Form>
            </Col>
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
        )}
      </StemLayout>
    </>
  );
};
export default StemBrokerComponent;
