import { useSelector, useDispatch } from "react-redux";
import StemReusableDialog from "../dialog";

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
        title={signupStatus ? "Signup" : "Signin"}
      >
        <span
          className="text-center text-primary"
          onClick={() => {
            dispatch({
              type: "SET_AUTH_STATUS_VISIBLE",
              payload: !signupStatus,
            });
          }}
        >
          {signupStatus ? (
            <h6>Already Have An Account..? Signin</h6>
          ) : (
            <h6>Don't Have Account..? Signup</h6>
          )}
        </span>
      </StemReusableDialog>
    </>
  );
};
export default StemAuthDialog;
