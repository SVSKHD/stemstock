import { Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const StemInput = ({
  placeholder,
  handleChange,
  value,
  label,
  disabled,
  type,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {type === "password" ? (
        <div className="mb-3">
          <Form.Label htmlFor="basic-url">{label}</Form.Label>
          <InputGroup>
            <Form.Control
              type={type === "password" && !showPassword ? "password" : "text"}
              disabled={disabled}
              placeholder={placeholder}
              className="stem-fin-input"
              value={value}
              onChange={handleChange}
              name={name}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              className="border-left-0"
              onClick={togglePasswordVisibility}
            >
              {type === "password" && (
                <>{showPassword ? <FaEyeSlash /> : <FaEye />}</>
              )}
            </Button>
          </InputGroup>
        </div>
      ) : (
        <Form.Group
          className="mb-3 stem-fin-input"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label className="mb-0">{label}</Form.Label>
          <div className="password-wrapper">
            <Form.Control
              type={type}
              disabled={disabled}
              placeholder={placeholder}
              className="stem-fin-input"
              value={value}
              onChange={handleChange}
              name={name}
            />
          </div>
        </Form.Group>
      )}
    </>
  );
};
export default StemInput;
