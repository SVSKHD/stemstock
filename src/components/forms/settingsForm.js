import { Form, Button } from "react-bootstrap";
import StemInput from "../reusables/input";

const ProfileSettingsForm = ({ handleChange, Details, handleSubmit, mode }) => {
  const formTitle = mode === "edit" ? "Edit Profile Settings" : "";
  const buttonText = mode === "edit" ? "Update Profile Settings" : "";

  return (
    <>
    <div className="mb-1">
      <h3>{formTitle}</h3>
      <Form>
        {/* Client ID Field */}
        <StemInput
          type="text"
          label="First Name"
          placeholder="First name"
          value={Details.firstName}
          name="firstName"
          handleChange={handleChange}
        />
        <StemInput
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="First name"
          value={Details.lastName}
          handleChange={handleChange}
        />
        <StemInput
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          value={Details.email}
          handleChange={handleChange}
        />

        <StemInput
          type="number"
          name="phoneNo"
          label="Phone No"
          placeholder="Phone No"
          value={Details.phoneNo}
          handleChange={handleChange}
        />

        <Button variant="primary" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </Form>
      </div>
    </>
  );
};

export default ProfileSettingsForm;
