import { Form } from "react-bootstrap";
const StemPlaceHolderInput = ({
  placeholder,
  handleChange,
  value,
  disabled,
  type
}) => {
  return (
    <>
      <Form.Control
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className="stem-fin-input"
        value={value}
        onChange={handleChange}
      />
    </>
  );
};
export default StemPlaceHolderInput;
