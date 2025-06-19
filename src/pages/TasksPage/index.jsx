import { useSelector } from "react-redux";
import Tasks from "../../containers/Tasks";
import { Navigate } from "react-router-dom";
import { URLS } from "../../constants/urls";

const TasksPage = () => {
  const userInfo = useSelector((state) => state.users.userInfo);

  return userInfo.role === "admin" ? <Tasks /> : <Navigate to={URLS.INITIAL} />;
};

export default TasksPage;
