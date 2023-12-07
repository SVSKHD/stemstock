import { Form } from "react-bootstrap";

const StemCheckBox = ({ label, checked, handleChange, disabled }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check
        type="checkbox"
        disabled={disabled}
        label={label}
        checked={checked}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default StemCheckBox;
