import { useEffect } from "react";
import { Card, Row, Col, Form, Badge, Button } from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/fa6";
const StrategyCard = ({
  strategy,
  zerodhaUser,
  zerodhaLogin,
  handleStrategyRun,
  handleEdit,
  handleDeleteDialog,
  handleStatusChange,
  handleStrategyRunClose,
  handleZerodhaLogout,
  run,
  handleRun,
  handleBrokerLogin,
}) => {
  return (
    <>
      <Card className="mb-4 shadow-sm bg-light">
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
                        label={strategy.name}
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
                      checked={strategy.status}
                      onChange={(e) =>
                        handleStatusChange(strategy._id, e.target.checked)
                      }
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
                  {zerodhaUser.requestToken && zerodhaUser.accessToken ? (
                    <Button variant="danger" onClick={handleZerodhaLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Button onClick={handleBrokerLogin}>
                      Login With Broker
                    </Button>
                  )}
                </span>
                <span>
                  <span className="border border-body px-2 py-2 rounded-start">
                    MTM
                  </span>
                  <span className="border border-body px-3 py-2 bg-secondary text-white rounded-end">
                    {strategy.overAllMTMValue}
                  </span>
                </span>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center justify-content-end">
                {run ? (
                  <span className="pe-3">
                    <Button
                      variant="outline-danger"
                      className="btn-sm"
                      onClick={() => handleStrategyRunClose(strategy)}
                    >
                      Close
                    </Button>
                  </span>
                ) : (
                  <span className="pe-3">
                    <Button
                      variant="outline-success"
                      className="btn-sm"
                      onClick={() => handleStrategyRun(strategy)}
                      disabled={!strategy.status}
                    >
                      Run
                    </Button>
                  </span>
                )}

                {/* <span className="pe-3">
                            <FaExpand className="text-theme" />
                          </span> */}
                {run ? (
                  <div />
                ) : (
                  <span
                    className="ps-3 cursor-pointer"
                    onClick={() => handleEdit(strategy)}
                  >
                    <FaPencil className="text-secondary" />
                  </span>
                )}

                <span
                  className="ps-3 cursor-pointer"
                  onClick={() => handleDeleteDialog(strategy)}
                >
                  <FaTrash className="text-danger" />
                </span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default StrategyCard;
