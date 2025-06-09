import BlueButton from "../../../shared/Buttons/BlueButton";
import { useDispatch } from "react-redux";
import { api } from "../../../api/client";
import { fetchTasks } from "../../../redux/slices/tasks.slice";

const TasksTable = ({
  tasksList,
  userInfo,
  handleUpdate,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this task?"
    );
    if (confirm) {
      const res = await api.TASKS.delete({ id });
      dispatch(fetchTasks({}));
      return res;
    } else {
      return;
    }
  };

  const handleStatus = async (item, value) => {
    await api.TASKS.update({
      id: item.id,
      data: { ...item, status: value },
    });
      dispatch(fetchTasks({}));
  }

  return (
    <>
      <div className="flex py-[30px] overflow-auto">
        {tasksList.length !== 0 ? (
          <table className="border border-black border-collapse">
            <thead>
              <tr>
                <th className="border border-black py-2 px-3">Title</th>
                <th className="border border-black py-2 px-3">Description</th>
                <th className="border border-black py-2 px-3">Due Date</th>
                <th className="border border-black py-2 px-3">Name</th>
                <th className="border border-black py-2 px-3">Email</th>
                <th className="border border-black py-2 px-3">Status</th>

                {userInfo.role === "admin" ? (
                  <>
                    <th className="border border-black py-2 px-3">Pending</th>
                    <th className="border border-black py-2 px-3">In Progress</th>
                    <th className="border border-black py-2 px-3">Completed</th>
                  </>
                ) : (
                  <>
                    <th className="border border-black py-2 px-3">Update</th>
                    <th className="border border-black py-2 px-3">Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {tasksList.map((item) => (
                <tr key={item.id}>
                  <td className="border border-black py-2 px-3">
                    {item.title}
                  </td>
                  <td className="border border-black py-2 px-3">
                    {item.description}
                  </td>
                  <td className="border border-black py-2 px-3">
                    {new Date(item.dueDate).getDate() +
                      "/" +
                      (new Date(item.dueDate).getMonth() + 1) +
                      "/" +
                      new Date(item.dueDate).getFullYear()}
                  </td>
                  <td className="border border-black py-2 px-3">
                    {item.userName}
                  </td>
                  <td className="border border-black py-2 px-3">
                    {item.userEmail}
                  </td>
                  <td className="border border-black py-2 px-3">
                    {item.status}
                  </td>

                  {userInfo.role === "admin" ? (
                    <>
                      <td className="border border-black py-2 px-3">
                        <BlueButton
                          title={"Pending"}
                          onClick={() => handleStatus(item, 'pending')}
                        />
                      </td>
                      <td className="border border-black py-2 px-3">
                        <BlueButton
                          title={"In Progress"}
                          onClick={() => handleStatus(item, 'in progress')}
                        />
                      </td>
                      <td className="border border-black py-2 px-3">
                        <BlueButton
                          title={"Completed"}
                          onClick={() => handleStatus(item, 'completed')}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-black py-2 px-3">
                        <BlueButton
                          title={"Update"}
                          onClick={() => handleUpdate(item)}
                        />
                      </td>
                      <td className="border border-black py-2 px-3">
                        <BlueButton
                          title={"Delete"}
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-2xl font-bold">No Data Found</h2>
        )}
      </div>
    </>
  );
};

export default TasksTable;
