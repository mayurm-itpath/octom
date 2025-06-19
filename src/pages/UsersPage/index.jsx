import { useSelector } from "react-redux";
import Users from "../../containers/Users";
import { Navigate } from "react-router-dom";
import { URLS } from "../../constants/urls";

const UsersPage = () => {
  const userInfo = useSelector((state) => state.users.userInfo);

  return userInfo.role === "admin" ? <Users /> : <Navigate to={URLS.INITIAL} />;
};

export default UsersPage;
