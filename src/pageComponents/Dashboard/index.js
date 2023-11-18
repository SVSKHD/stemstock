import StemLayout from "@/Layout/Layout"
import { Container, Row, Col, Card, Button, Form, InputGroup, Dropdown, Badge } from "react-bootstrap"
import { FaCirclePlus, FaMagnifyingGlass, FaBarsProgress, FaEllipsisVertical, FaExpand } from "react-icons/fa6";

const StemDashboardComponent = () =>{
return(
    <>
    <StemLayout>
        <section className="dashboard-sec1 mt-3">
            <Container fluid className="ps-0">
                <Row>
                    <Col md={3}>
                        <Card className="shadow-sm rounded-3 border-0">
                            <Card.Body className="px-2">
                                <Row>
                                    <Col md={6} className="border-2 border-dark-subtle border-end">
                                        <p className="fw-bold small text-body-secondary mb-2">TOTAL PNL</p>
                                        <p className="text-success fw-bold mb-0">0/-</p>
                                    </Col>
                                    <Col md={6}>
                                        <p className="fw-bold small text-body-secondary mb-2">TOTAL ORDER</p>
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
                                                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="btn-sm" >
                                                    <FaBarsProgress />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Active Strategies <span bg="secondary">0</span></Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Running Strategies <span bg="secondary">0</span></Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <span>
                                                <span className="text-theme fw-bold ps-1">Total Strategies:</span> <span className="text-dark">1</span>
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
                                                <Button variant="outline-secondary" id="button-addon2">
                                                    <FaMagnifyingGlass />
                                                </Button>
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                    <Col md={3}>
                                        <div className="text-end">
                                            <Button variant="outline-primary"><FaCirclePlus /> Create New</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
        <hr/>
        
        <section>
            <Container fluid className="ps-0">
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <span>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`}>
                                                <Form.Check // prettier-ignore
                                                    type={type}
                                                    id={`default-${type}`}
                                                />
                                                </div>
                                            ))}
                                        </Form>
                                    </span>
                                    <span className="on-off-switch">
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            label=""
                                        />
                                    </span>
                                    <span className="pe-5">
                                        <p className="mb-0"><Badge pill bg="primary">New</Badge></p>
                                    </span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="pe-3">
                                        <Button variant="primary" className="btn-sm">Add Broker</Button>
                                    </span>
                                    <span >
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
                                        <Button variant="outline-success" disabled className="btn-sm">Run</Button>
                                    </span>
                                    <span className="pe-3">
                                        <FaExpand className="text-theme"/>
                                    </span>
                                    <span>
                                        <FaEllipsisVertical className="text-primary" />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    </StemLayout>
    </>
)
}
export default StemDashboardComponent