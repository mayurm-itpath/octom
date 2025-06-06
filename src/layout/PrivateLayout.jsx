import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import withUser from "../hoc/withUser";

const PrivateLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default withUser(PrivateLayout);
