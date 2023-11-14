import { NavLink } from "react-bootstrap";
import StemNavBar from "./Header";
import StemAuthDialog from "@/components/Auth/AuthDialog";
import Head from "next/head";


const StemLayout = (props) => {
  return (
    <>
    <Head>
      <title>Stem fin</title>
    </Head>
      <StemNavBar />
      <StemAuthDialog/>
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-md-2 col-lg-2 col-xs-12 col-sm-12" id="leftbar">
          <div className="bg-light h-100 text-center">
            <NavLink href="/dashboard">Dashboard
            </NavLink>
            <NavLink href="/strategy">Strategy
            </NavLink>
            <NavLink href="/broker" className="active">Broker
            </NavLink>
          </div>
        </div>
        <div className="col-md-10 col-lg-10 col-xs-12 col-sm-12 main-content">
          <div className="px-2 py-3">
          {props.children}
          </div>
        </div>
      </div>
    </>
  );
};
export default StemLayout;
