import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import withAuth from "../hoc/withAuth";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default withAuth(PublicLayout);
