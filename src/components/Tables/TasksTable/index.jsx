import BlueButton from "../../../shared/Buttons/BlueButton";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTask,
} from "../../../redux/slices/tasks.slice";
import CustomTable from "../CustomTable";

const TasksTable = ({ tasks, userInfo, handleUpdate }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure, Do you want to delete this task?"
    );
    if (confirm) {
      await dispatch(deleteTask(id));
      await dispatch(fetchTasks({}));
    } else {
      return;
    }
  };

  const handleStatus = async (item, value) => {
    await dispatch(
      updateTask({ id: item.id, data: { ...item, status: value } })
    );
    await dispatch(fetchTasks({}));
  };

  const adminColumns = [
    {
      id: "title",
      label: "Title",
      fieldName: "title",
    },
    {
      id: "description",
      label: "Description",
      fieldName: "description",
    },
    {
      id: "status",
      label: "Status",
      fieldName: "status",
    },
    {
      id: "dueDate",
      label: "Due Date",
      fieldName: "dueDate",
    },
    {
      id: "userName",
      label: "Name",
      fieldName: "userName",
    },
    {
      id: "userEmail",
      label: "Email",
      fieldName: "userEmail",
    },
    {
      id: "actions",
      label: "Actions",
      render: ({ item }) => (
        <>
          <span className="flex gap-3">
            <BlueButton
              title={"In Progress"}
              onClick={() => handleStatus(item, "in progress")}
            />
            <BlueButton
              title={"Completed"}
              onClick={() => handleStatus(item, "completed")}
            />
          </span>
        </>
      ),
    },
  ];

  const usersColumns = [
    {
      id: "title",
      label: "Title",
      fieldName: "title",
    },
    {
      id: "description",
      label: "Description",
      fieldName: "description",
    },
    {
      id: "status",
      label: "Status",
      fieldName: "status",
    },
    {
      id: "dueDate",
      label: "Due Date",
      fieldName: "dueDate",
    },
    {
      id: "actions",
      label: "Actions",
      render: ({ item }) => (
        <>
          <span className="flex gap-3">
            <BlueButton title={"Update"} onClick={() => handleUpdate(item)} />
            <BlueButton
              title={"Delete"}
              onClick={() => handleDelete(item.id)}
            />
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex py-[30px] overflow-auto">
        {tasks?.data?.length ? (
          userInfo.role === "admin" ? (
            <CustomTable columns={adminColumns} data={tasks.data} />
          ) : (
            <CustomTable columns={usersColumns} data={tasks.data} />
          )
        ) : (
          <h2 className="text-2xl font-bold">No Data Found</h2>
        )}
      </div>
    </>
  );
};

export default TasksTable;
