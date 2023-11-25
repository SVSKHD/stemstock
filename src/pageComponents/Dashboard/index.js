import StemLayout from "@/Layout/Layout";
import StrategyOperations from "@/services/startegy";
import { useEffect, useState } from "react";
// import { KiteTicker } from "kiteconnect";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Dropdown,
  Badge,
} from "react-bootstrap";
import {
  FaCirclePlus,
  FaMagnifyingGlass,
  FaBarsProgress,
  FaEllipsisVertical,
  FaExpand,
} from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import io from "socket.io-client";


const StemDashboardComponent = () => {
  const { strategyFetch } = StrategyOperations();
  const { userData, zerodhaUser } = useSelector((state) => ({ ...state }));
  const [strategy, setStrategy] = useState([]); // Corrected the typo in variable name

  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const Router = useRouter();

  useEffect(() => {
    if (!userData) {
      Router.push("/");
      dispatch({
        type: "SET_AUTH_DIALOG_VISIBLE",
        payload: true,
      });
    }
  }, [userData]);

  useEffect(() => {
    strategyFetch(userData ? userData.user.id : "")
      .then((res) => {
        const fetchedData = res.data;

        // Check if the strategy state already contains an item with the same ID
        const exists = strategy.find((item) => item._id === fetchedData._id);

        if (!exists) {
          // If it doesn't exist, add it to the state
          setStrategy(() => [fetchedData]);
        } else {
          // If it exists, you might want to update it or do nothing
          // For example, to update the existing item:
          setStrategy((prevStrategy) =>
            prevStrategy.map((item) =>
              item._id === fetchedData._id ? fetchedData : item
            )
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userData]);

  useEffect(() => {
    console.log("hello zerodha request", query.request_token);
    if (query.request_token) {
      dispatch({
        type: "LOGGED_IN_ZERODHA",
        payload: query.request_token,
      });
    }
  }, [query]);

  // const socketInitilizer = async() =>{

  // }

  // socket
  //   useEffect(() => {
  //     // Your Zerodha API Key
  //     const apiKey = 'your_api_key';
  //     // The access token you received after login
  //     const accessToken = 'your_access_token';

  //     const ticker = new KiteTicker({ api_key: apiKey, access_token: accessToken });

  //     ticker.connect();
  //     ticker.on('ticks', (ticks) => {
  //         console.log('Ticks:', ticks);
  //     });
  //     ticker.on('connect', () => {
  //         console.log('Connected');
  //         // Subscribe to instruments here
  //         ticker.subscribe([738561]); // Replace with your instrument tokens
  //         ticker.setMode(ticker.modeFull, [738561]); // Set the mode for the instruments
  //     });
  //     ticker.on('error', (error) => {
  //         console.log('WebSocket error:', error);
  //     });
  //     ticker.on('close', (reason) => {
  //         console.log('WebSocket connection closed:', reason);
  //     });

  //     return () => {
  //         ticker.disconnect();
  //     };
  // }, []);

  const zerodhaLogin = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_ZERODHA_KEY;
    const redirectUrl = encodeURIComponent(
      process.env.NEXT_PUBLIC_API_ZERODHA_REDIRECT
    );
    window.location.href = `https://kite.trade/connect/login?api_key=${apiKey}&redirect_uri=${redirectUrl}`;
  };

  const zerdodhaAccessTokenCapture = () => {};

  return (
    <>
      <StemLayout>
        <section className="dashboard-sec1 mt-3">
          <Container fluid className="ps-0">
            <Row>
              <Col md={3}>
                <Card className="shadow-sm rounded-3 border-0">
                  <Card.Body className="px-2">
                    <Row>
                      <Col
                        md={6}
                        className="border-2 border-dark-subtle border-end"
                      >
                        <p className="fw-bold small text-body-secondary mb-2">
                          TOTAL PNL
                        </p>
                        <p className="text-success fw-bold mb-0">0/-</p>
                      </Col>
                      <Col md={6}>
                        <p className="fw-bold small text-body-secondary mb-2">
                          TOTAL ORDER
                        </p>
                        <p className="text-dark fw-bold mb-0">0</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={9}>
                {/* running strategy */}
                <Card className="shadow-sm rounded-3 border-0">
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <div className="d-flex align-items-center">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="outline-primary"
                              id="dropdown-basic"
                              className="btn-sm"
                            >
                              <FaBarsProgress />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Active Strategies <span bg="secondary">0</span>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Running Strategies <span bg="secondary">0</span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <span>
                            <span className="text-theme fw-bold ps-1">
                              Total Strategies:
                            </span>{" "}
                            <span className="text-dark">{strategy.length}</span>
                          </span>
                        </div>
                      </Col>
                      <Col md={5}>
                        <Form>
                          <InputGroup className="mb-3">
                            <Form.Control
                              placeholder="Search Strategy"
                              aria-label="Search Strategy"
                              aria-describedby="basic-addon2"
                            />
                            <Button
                              variant="outline-secondary"
                              id="button-addon2"
                            >
                              <FaMagnifyingGlass />
                            </Button>
                          </InputGroup>
                        </Form>
                      </Col>
                      <Col md={3}>
                        <div className="text-end">
                          <Button href="/strategy" variant="outline-primary">
                            <FaCirclePlus /> Create New
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <hr />

        <section>
          <Container fluid className="ps-0">
            {strategy.map((r, i) => (
              <>
                <Card key={i}>
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>
                            <Form>
                              {["checkbox"].map((type) => (
                                <div key={`default-${type}`}>
                                  <Form.Check // prettier-ignore
                                    type={type}
                                    id={`default-${type}`}
                                    className="strategy-select"
                                  />
                                </div>
                              ))}
                            </Form>
                          </span>
                          <span>{r.name}</span>
                          <span className="on-off-switch">
                            <Form.Check // prettier-ignore
                              type="switch"
                              id="custom-switch"
                              label=""
                            />
                          </span>
                          <span className="pe-5">
                            <p className="mb-0">
                              <Badge pill bg="primary">
                                New
                              </Badge>
                            </p>
                          </span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex align-items-center justify-content-center">
                          <span className="pe-3">
                            {zerodhaUser ? (
                              <Button variant="success">
                                <FaCheck />
                              </Button>
                            ) : (
                              <Button
                                variant="primary"
                                className="btn-sm"
                                onClick={zerodhaLogin}
                              >
                                Login With Zerodha
                              </Button>
                            )}
                          </span>
                          <span>
                            <span className="border border-body px-2 py-2 rounded-start">
                              MTM
                            </span>
                            <span className="border border-body px-3 py-2 bg-secondary text-white rounded-end">
                              ---
                            </span>
                          </span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex align-items-center justify-content-end">
                          <span className="pe-3">
                            <Button
                              variant="outline-success"
                              disabled
                              className="btn-sm"
                            >
                              Run
                            </Button>
                          </span>
                          <span className="pe-3">
                            <FaExpand className="text-theme" />
                          </span>
                          <span>
                            <FaEllipsisVertical className="text-primary" />
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </>
            ))}
          </Container>
        </section>
      </StemLayout>
    </>
  );
};
export default StemDashboardComponent;
