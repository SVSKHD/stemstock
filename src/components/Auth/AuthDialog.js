import { useSelector, useDispatch } from "react-redux";
import StemReusableDialog from "../reusables/dialog";
import StemSignin from "./signin";
import StemSignup from "./signup";
import StemForgetPassword from "./forgotpassword";

const StemAuthDialog = () => {
  const { authDialog, signupStatus, forgetPassword } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const handleRememberPassword = () => {
    dispatch({
      type: "SET_FORGET_PASSWORD",
      payload: false,
    });
    dispatch({
      type: "SET_AUTH_STATUS_VISIBLE",
      payload: false,
    });
  };
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
        size={forgetPassword ? "lg" : signupStatus ? "xl" : "lg"}
        title={
          forgetPassword
            ? "forgot Password"
            : signupStatus
            ? "Signup"
            : "Signin"
        }
      >
        {forgetPassword ? (
          <StemForgetPassword />
        ) : (
          <>{signupStatus ? <StemSignup /> : <StemSignin />}</>
        )}

        {forgetPassword ? (
         <span
         className="text-end"
         onClick={() => handleRememberPassword()}
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
        ) : (
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
        )}
      </StemReusableDialog>
    </>
  );
};
export default StemAuthDialog;
