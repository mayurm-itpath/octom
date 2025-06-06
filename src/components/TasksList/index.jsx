import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/tasks.slice";
import BlueButton from "../../shared/Buttons/BlueButton";
import { api } from "../../api/client";
import TasksForm from "../Forms/TasksForm";
import useModal from "../../hooks/useModal";

const TasksList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const userInfo = useSelector((state) => state.users.userInfo);
  const [updateData, setUpdateData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { open, handleOpen, handleClose } = useModal();

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  if (tasks.isLoading) {
    return <>Loading...</>;
  }

  const handleUpdate = (item) => {
    setIsUpdate(true);
    setUpdateData((prev) => ({ ...prev, ...item }));
    handleOpen();
  };

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

  const handleApprove = async (item) => {
    await api.TASKS.update({
      id: item.id,
      data: { ...item, status: "approved" },
    });
    dispatch(fetchTasks({}));
  };

  const handleReject = async (item) => {
    await api.TASKS.update({
      id: item.id,
      data: { ...item, status: "reject" },
    });
    dispatch(fetchTasks({}));
  };

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          {userInfo.role === "admin" ? (
            <></>
          ) : (
            <div>
              <BlueButton title={"Add Task"} onClick={handleOpen} />
            </div>
          )}

          <div className="flex py-[30px]">
            {tasks.data.length !== 0 ? (
              <table className="border border-black border-collapse">
                <thead>
                  <tr>
                    <th className="border border-black py-2 px-3">Title</th>
                    <th className="border border-black py-2 px-3">
                      Description
                    </th>
                    <th className="border border-black py-2 px-3">Due Date</th>
                    <th className="border border-black py-2 px-3">Name</th>
                    <th className="border border-black py-2 px-3">Email</th>
                    <th className="border border-black py-2 px-3">Status</th>

                    {userInfo.role === "admin" ? (
                      <>
                        <th className="border border-black py-2 px-3">
                          Approve
                        </th>
                        <th className="border border-black py-2 px-3">
                          Reject
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="border border-black py-2 px-3">
                          Update
                        </th>
                        <th className="border border-black py-2 px-3">
                          Delete
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {tasks.data.map((item) => (
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
                              title={"Approve"}
                              onClick={() => handleApprove(item)}
                            />
                          </td>
                          <td className="border border-black py-2 px-3">
                            <BlueButton
                              title={"Reject"}
                              onClick={() => handleReject(item)}
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

          <TasksForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            updateData={updateData}
            openModal={open}
            handleCloseModal={handleClose}
          />
        </div>
      </section>
    </>
  );
};

export default TasksList;
