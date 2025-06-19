import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/tasks.slice";
import TasksTable from "../../components/Tables/TasksTable";

const Dashboard = () => {
  const userInfo = useSelector((state) => state.users.userInfo);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const pendingTasks = tasks.data.filter(
    (task) => task.status === "pending"
  ).length;
  const inProgressTasks = tasks.data.filter(
    (task) => task.status === "in progress"
  ).length;
  const completedTasks = tasks.data.filter(
    (task) => task.status === "completed"
  ).length;

  // Fetch tasks
  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="container mx-auto pt-[50px]">
          <h2 className="text-xl font-bold">Welcome {userInfo.name},</h2>
          <div className="text-lg font-bold">Email Id: {userInfo.email}</div>

          <div className="flex flex-wrap gap-5 py-[20px]">
            <div className="py-3 px-5 rounded shadow-lg">
              <h3 className="text-xl font-bold">Pending Tasks</h3>
              <div className="text-2xl font-bold">{pendingTasks}</div>
            </div>

            <div className="py-3 px-5 rounded shadow-lg">
              <h3 className="text-xl font-bold">In Progress Tasks</h3>
              <div className="text-2xl font-bold">{inProgressTasks}</div>
            </div>

            <div className="py-3 px-5 rounded shadow-lg">
              <h3 className="text-xl font-bold">Completed Tasks</h3>
              <div className="text-2xl font-bold">{completedTasks}</div>
            </div>
          </div>

          <TasksTable tasks={tasks} userInfo={userInfo} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
