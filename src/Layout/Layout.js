import { NavLink } from "react-bootstrap";
import StemNavBar from "./Header";

const StemLayout = (props) => {
  return (
    <>
      <StemNavBar />
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
          <div className="bg-dark h-100 text-center p-5">
            <NavLink className="text-white  text-start p-2" href="/">
              <h3>Dashboard</h3>
            </NavLink>
            <NavLink className="text-white text-start p-2" href="/startegy">
              <h3>Strategy</h3>
            </NavLink>
            <NavLink className="text-white text-start p-2" href="/broker">
              <h3>Broker</h3>
            </NavLink>
          </div>
        </div>
        <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
          {props.children}
        </div>
      </div>
    </>
  );
};
export default StemLayout;
