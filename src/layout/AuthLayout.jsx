import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import withAuth from "../hoc/withAuth";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default withAuth(AuthLayout);
