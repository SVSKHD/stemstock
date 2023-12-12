import { Form } from "react-bootstrap";
const StemInput = ({
  placeholder,
  handleChange,
  value,
  label,
  disabled,
  type,
  name,
}) => {
  return (
    <>
      <Form.Group
        className="mb-3 stem-fin-input"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label className="mb-0">{label}</Form.Label>
        <Form.Control
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className="stem-fin-input"
          value={value}
          onChange={handleChange}
          name={name}
        />
      </Form.Group>
    </>
  );
};
export default StemInput;
