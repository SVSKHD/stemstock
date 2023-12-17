import StemLayout from "@/Layout/Layout";
import ProfileSettingsForm from "@/components/forms/settingsForm";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import UserOperations from "@/services/user";
import StemToast from "@/components/reusables/js/toast";

const StemSettingsPage = () => {
  const [mode, setMode] = useState("");
  const { userData } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch()
  const [details, setDetails] = useState({
    email: userData.user?.email,
    firstName: userData.user?.firstname,
    lastName: userData.user?.lastname,
    phoneNo: userData.user?.phone,
  });

  const { userUpdate } = UserOperations();

  const handleSubmit = () => {
    userUpdate(userData.user.id, details)
      .then((res) => {
        StemToast("successfully Update");
        console.log("user", res.data);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data, // Assuming the updated user object is returned in res.data.user
        });
        setMode("");
      })
      .catch(() => {
        StemToast("please try again", "error");
      });
    console.log("Form Data:", details);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const fetchDetails = () => {};

  return (
    <>
      <></>
      <StemLayout>
        <h1>
          Hello{" "}
          <span className="text-success">"{userData.user.firstname}"</span>
          profile settings
        </h1>
        <hr />

        <div className="row">
          <div className="col">
            <div className="card shadow-lg">
              <div className="card-body">
                {mode === "edit" ? (
                  <>
                    <ProfileSettingsForm
                      Details={details}
                      mode={mode}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                    />
                    <Button onClick={() => setMode("")}>cancel</Button>
                  </>
                ) : (
                  <>
                    <div className="mb-2">
                      <Button variant="dark" onClick={() => setMode("edit")}>
                        <FaPen size={25} />
                      </Button>
                    </div>
                    <h5>User Details</h5>
                    <hr />
                    <div className="mb-1">
                      <p>Email : {userData?.user?.email}</p>
                    </div>
                    <div className="mb-1">
                      <p>Name : {userData?.user?.firstname}</p>
                    </div>
                    <div className="mb-1">
                      <p>phone : {userData?.user?.phone}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </StemLayout>
    </>
  );
};

export default StemSettingsPage;
