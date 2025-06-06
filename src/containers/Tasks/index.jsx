import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/tasks.slice";
import BlueButton from "../../shared/Buttons/BlueButton";
import TasksForm from "../../components/Forms/TasksForm";
import useModal from "../../hooks/useModal";
import TasksTable from "../../components/Tables/TasksTable";
import SearchInput from "../../shared/Inputs/SearchInput";
import { api } from "../../api/client";
import _ from "lodash";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const userInfo = useSelector((state) => state.users.userInfo);
  const [updateData, setUpdateData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const { open, handleOpen, handleClose } = useModal();
  const [tasksList, setTasksList] = useState([]);
  const [searchTasks, setSearchTasks] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  useEffect(() => {
    if (userInfo.role === "user") {
      setTasksList(
        tasks.data.filter((task) => task.userEmail === userInfo.email)
      );
    } else {
      setTasksList(tasks.data);
    }
  }, [userInfo, tasks]);

  if (tasks.isLoading) {
    return <>Loading...</>;
  }

  const handleUpdate = (item) => {
    setIsUpdate(true);
    setUpdateData((prev) => ({ ...prev, ...item }));
    handleOpen();
  };

  const handleSearch = async (data) => {
    const res1 = await api.TASKS.searchByTitle({ data });
    const res2 = await api.TASKS.searchByName({ data });
    setTasksList(_.uniqBy([...res1, ...res2], "id"));
  };

  const handleChangeSearch = (e) => {
    setSearchTasks(e.target.value);
  };

  const handleSort = async (e) => {
    const res = await api.TASKS.sortByDate({ data: e.target.value });
    setTasksList(res);
  };

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          {userInfo.role === "admin" ? (
            <>
              <div>
                <SearchInput
                  placeholder={"Search"}
                  type={"text"}
                  value={searchTasks}
                  onChange={handleChangeSearch}
                />
                <BlueButton
                  title={"Search"}
                  onClick={() => handleSearch(searchTasks)}
                />
              </div>
              <br />

              <div>
                <select
                  onChange={handleSort}
                  className="p-2 border border-black rounded"
                >
                  <option value="">Sort By</option>
                  <option value="dueDate">Due Date</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <BlueButton title={"Add Task"} onClick={handleOpen} />
              </div>
            </>
          )}

          <TasksTable
            userInfo={userInfo}
            tasksList={tasksList}
            handleUpdate={handleUpdate}
          />

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

export default Tasks;
