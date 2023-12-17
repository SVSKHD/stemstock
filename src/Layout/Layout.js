import { NavLink } from "react-bootstrap";
import StemNavBar from "./Header";
import StemAuthDialog from "@/components/Auth/AuthDialog";
import Head from "next/head";
import { useRouter } from "next/router";


const StemLayout = (props) => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  return (
    <>
    <Head>
      <title>Stem fin</title>
    </Head>
      <StemNavBar />
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-md-2 col-lg-2 col-xs-12 col-sm-12" id="leftbar">
          <div className="bg-light h-100 text-center">
            <NavLink href="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard
            </NavLink>
            <NavLink href="/strategy" className={isActive('/strategy') ? 'active' : ''} >Strategy
            </NavLink>
            <NavLink href="/broker" className={isActive('/broker') ? 'active' : ''}>Broker
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
