import { useSelector, useDispatch } from "react-redux";
import StemReusableDialog from "../reusables/dialog";
import StemSignin from "./signin";
import StemSignup from "./signup";

const StemAuthDialog = () => {
  const { authDialog, signupStatus } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  return (
    <>
      <StemReusableDialog
        onShow={authDialog}
        onHide={() =>
          dispatch({
            type: "SET_AUTH_DIALOG_VISIBLE",
            payload: false,
          })
        }
        size={signupStatus ? "xl" : "lg"}
        title={signupStatus ? "Signup" : "Signin"}
      >
        {signupStatus ? <StemSignup /> : <StemSignin />}
        <span
          className="text-end"
          onClick={() => {
            dispatch({
              type: "SET_AUTH_STATUS_VISIBLE",
              payload: !signupStatus,
            });
          }}
        >
          {signupStatus ? (
            <span className="d-flex align-items-center justify-content-end text-dark">
              <span>Already Have An Account..?</span>{" "}
              <span class="text-theme">Signin</span>
            </span>
          ) : (
            <span className="d-flex align-items-center justify-content-end text-dark">
              <span>Don't Have Account?</span>{" "}
              <span class="text-theme">Signup</span>
            </span>
          )}
        </span>
      </StemReusableDialog>
    </>
  );
};
export default StemAuthDialog;
