import { Form, Button } from "react-bootstrap";

const ZerodhaBrokerForm = ({
  handleChange,
  brokerDetails,
  handleSubmit,
  mode
}) => {
  const formTitle = mode === "edit" ? "Edit Zerodha Broker" : "Create Zerodha Broker";
  const buttonText = mode === "edit" ? "Update" : "Create";

  return (
    <>
      <h3>{formTitle}</h3>
      <Form>
        {/* Client ID Field */}
        <Form.Group className="mb-3" controlId="formClientId">
          <Form.Label>Enter your client ID</Form.Label>
          <Form.Control
            type="text"
            name="clientId"
            placeholder="Client ID"
            value={brokerDetails.clientId}
            onChange={handleChange}
          />
        </Form.Group>

        {/* API Key Field */}
        <Form.Group className="mb-3" controlId="formApiKey">
          <Form.Label>Enter API Key</Form.Label>
          <Form.Control
            type="text"
            name="apiKey" // Corrected to match the state's field name
            placeholder="API Key"
            value={brokerDetails.apiKey}
            onChange={handleChange}
          />
        </Form.Group>

        {/* API Secret Field */}
        <Form.Group className="mb-3" controlId="formApiSecret">
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
          {buttonText}
        </Button>
      </Form>
    </>
  );
};

export default ZerodhaBrokerForm;
