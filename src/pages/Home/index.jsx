import { useSelector } from "react-redux";
import Tasks from "../../containers/Tasks";
import Dashboard from "../../containers/Dashboard";

const HomePage = () => {
  const userInfo = useSelector((state) => state.users.userInfo);

  return userInfo.role === "admin" ? <Dashboard /> : <Tasks />;
};

export default HomePage;
