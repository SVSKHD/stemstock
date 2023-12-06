import StemLayout from "@/Layout/Layout";
import StrategyOperations from "@/services/startegy";
import { useEffect, useState } from "react";
import {
  Accordion,
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
  FaPencil,
} from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import io from "socket.io-client";
import zerodhaOperations from "@/services/zerdoha";
import StemToast from "@/components/reusables/js/toast";
import axios from "axios";

const StemDashboardComponent = () => {
  const { strategyFetch } = StrategyOperations();
  const { userData, zerodhaUser } = useSelector((state) => ({ ...state }));
  const [strategy, setStrategy] = useState([]); // Corrected the typo in variable name
  const [strategySearch, setStrategySeacrh] = useState("");
  const { zerodhaPlaceOrder } = zerodhaOperations();

  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const Router = useRouter();

  useEffect(() => {
    if (!userData) {
      Router.push("/");
    }
  }, [userData, Router]);

  const LivePrice = () => {
    const exchange = "NSE";
    const tradingsymbol = "NIFTY";

    axios
      .get("https://api.kite.trade/instruments", {
        params: {
          exchange,
          tradingsymbol,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          const instrument = response.data[0]; // Assuming you want the first instrument in the list.
          const instrumentToken = instrument.instrument_token;
          console.log("Instrument Token:", instrumentToken);
        } else {
          console.log("Instrument not found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    strategyFetch(userData ? userData.user.id : "")
      .then((res) => {
        const fetchedData = res.data; // assuming this is an array of strategies

        // Update the state with the new data, merging it with existing data
        setStrategy((prevStrategy) => {
          // Create a map of existing strategies by their _id for quick access
          const existingStrategies = new Map(
            prevStrategy.map((item) => [item._id, item])
          );

          // Merge the fetched strategies into the existing ones
          fetchedData.forEach((strategy) => {
            existingStrategies.set(strategy._id, strategy);
          });

          // Convert the map back into an array
          return Array.from(existingStrategies.values());
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log("strategies", strategy);
    LivePrice();
  }, [userData, setStrategy]);

  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, [userData, router]);

  useEffect(() => {
    if (userData && query.request_token) {
      const exchangeToken = async () => {
        try {
          dispatch({
            type: "STORE_REQUEST_TOKEN",
            payload: query.request_token,
          });
          const response = await axios.post(
            `api/zerodha/callBack?id=${
              userData ? userData.user.id : ""
            }&requestToken=${query.request_token}`
          );
          const accessToken = response.data.accessToken;

          StemToast("Successfully logged in", "success");

          // Dispatch once to avoid loop
          dispatch({
            type: "LOGGED_IN_ZERODHA",
            payload: accessToken,
          });
        } catch (error) {
          console.error("Error in exchanging token:", error);
          StemToast("Sorry Zerodha Login Failed", "error");
        }
      };

      exchangeToken();
    }
  }, [userData, query.request_token, dispatch]);

  //filtering strategies
  const handleSearchChange = (e) => {
    setStrategySeacrh(e.target.value.toLowerCase());
  };

  const filteredStrategies = strategy.filter((s) =>
    s.name.toLowerCase().includes(strategySearch)
  );

  // strategy active and non active count
  const NotActiveStrategy = strategy.filter((item) => !item.status);

  const runningStrategy = strategy.filter((item) => item.status === true);

  const zerodhaLogin = () => {
    axios
      .get(`/api/zerodha/login?id=${userData.user.id}`)
      .then((res) => {
        if (res.data) {
          // Redirect the user to Zerodha login page
          window.location.href = res.data.loginUrl;
        } else {
          console.error("Failed to get Zerodha login URL");
          // Handle the error appropriately (e.g., show an error message to the user)
        }
      })
      .catch((error) => {
        console.error("Error fetching Zerodha login URL:", error);
        StemToast(error.message, "error");
      });
  };

  const handleStartegyRun = async (data) => {
    console.log("r", data.legs);
    const placeOrder = {
      requestToken: "",
      legs: data.legs,
    };
    await zerodhaPlaceOrder(userData.user.id, {
      legs: [
        {
          trialStopLossValue: {
            x: 1,
            y: 5,
          },
          instrument: "Nifty",
          instrumentType: "Nifty",
          entry_type: "time",
          expiry: "current",
          index: 1,
          segment: "Nifty",
          strike_type: "Call",
          strike_value: "15000",
          position: "Long",
          quantity: "100",
          takeProfit: true,
          takeProfitType: "Limit",
          takeProfitValue: 200,
          stopLoss: true,
          stopLossType: "Market",
          stopLossValue: 100,
          trialStopLoss: false,
          trialStopLossType: "pts",
          waitAndTrade: false,
          waitAndTradeType: "hello",
          waitAndTradeValue: 0,
          reEntry: true,
          reEntryType: "re-cost",
          reEntryValue: 0,
          _id: "656394794280e92f8c34e683",
        },
      ],
    })
      .then((res) => {
        console.log("fetched", res);
      })
      .catch((err) => {
        StemToast("please try agian", "error");
      });
  };

  const handleEdit = (data) => {
    console.log("element", data);
  };

  // const StrategyDetail = useAccordionButton(eventKey, () =>
  //   console.log("totally custom!")
  // );

  return (
    <>
      <StemLayout>
        {/* dashboard head section */}
        <section className="dashboard-sec1 mt-3">
          <Container fluid className="ps-0">
            <Row>
              <Col md={3}>
                <Card className="shadow-sm rounded-3 border-0 bg-success-subtle">
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
                <Card className="shadow-sm rounded-3 border-0 py-1 bg-light">
                  <Card.Body>
                    <Row className="align-items-center">
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
                                Non-Active Strategies{" "}
                                <span bg="secondary">
                                  {NotActiveStrategy.length}
                                </span>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Running Strategies{" "}
                                <span bg="secondary">
                                  {runningStrategy.length}
                                </span>
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
                          <InputGroup>
                            <Form.Control
                              placeholder="Search Strategy"
                              aria-label="Search Strategy"
                              aria-describedby="basic-addon2"
                              value={strategySearch}
                              onChange={handleSearchChange}
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

        {/* startegies map */}
        <section>
          <Container fluid className="ps-0">
            {filteredStrategies.map((r, i) => (
              <>
                <Card key={i} className="mb-4 shadow-sm bg-light">
                  <Card.Body className="pb-1">
                    <Row>
                      <Col md={4}>
                        <div className="row">
                          <span className="col-6">
                            <Form>
                              <div>
                                <Form.Check // prettier-ignore
                                  type={"checkbox"}
                                  className="strategy-select"
                                  label={r.name}
                                />
                              </div>
                            </Form>
                          </span>

                          <span className="col-3">
                            <span className="on-off-switch">
                              <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label=""
                              />
                            </span>
                          </span>
                          <span className="col-3 text-center">
                            <span className="pe-5">
                              <p className="mb-0">
                                <Badge pill bg="primary">
                                  New
                                </Badge>
                              </p>
                            </span>
                          </span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex align-items-center justify-content-center">
                          <span className="pe-3">
                            {zerodhaUser.requestToken &&
                            zerodhaUser.accessToken ? (
                              <Button variant="danger">Logout</Button>
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
                              {r.overallMTM}
                            </span>
                          </span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex align-items-center justify-content-end">
                          <span className="pe-3">
                            <Button
                              variant="outline-success"
                              className="btn-sm"
                              onClick={() => handleStartegyRun(r)}
                              disabled={zerodhaUser.requestToken === null}
                            >
                              Run
                            </Button>
                          </span>
                          {/* <span className="pe-3">
                            <FaExpand className="text-theme" />
                          </span> */}
                        
                          <span
                            className="ps-3 cursor-pointer"
                            onClick={() => handleEdit(r)}
                          >
                            <FaPencil className="text-secondary" />
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
