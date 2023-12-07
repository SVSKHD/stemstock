import { Form } from "react-bootstrap";

const StemSelect = ({ value, options, handleChange , label , placeholder}) => {
  return (
    <>
    <Form.Label className="text-start">{label}</Form.Label>
    <Form.Select
      aria-label="Default select example"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    >
      {options.map((option) => (
        <option key={option.value} value={option.displayText}>
          {option.displayText}
        </option>
      ))}
    </Form.Select>
    </>
  );
};

export default StemSelect;