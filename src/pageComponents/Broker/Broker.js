import StemLayout from "@/Layout/Layout"
import { Row, Col, Form, Button } from "react-bootstrap"

const StemBrokerComponent = () =>{
return(
    <>
    <StemLayout>
        <Row>
            <Col md={5}>
                <h3>Zerodha Setup</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter your client ID</Form.Label>
                        <Form.Control type="text" placeholder="Client ID" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter API Key</Form.Label>
                        <Form.Control type="text" placeholder="API Key" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter API Secret</Form.Label>
                        <Form.Control type="text" placeholder="API Secret" />
                    </Form.Group>
                    <Button variant="primary">Save</Button>
                </Form>
            </Col>
            <Col md={{ span: 5, offset: 2 }}>
                <p className="fw-bold mt-5">Find any difficulty? <span className="fw-normal text-secondary">Follow the Setup Tutorial</span></p>

                <iframe width="100%" height="250px" className="rounded-4" src="https://www.youtube.com/embed/dV00JxVDBdk?si=KgnbE4k434Q44ZD8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Col>
        </Row>
    </StemLayout>
    </>
)
}
export default StemBrokerComponent