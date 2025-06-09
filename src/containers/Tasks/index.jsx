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
import useDebounce from "../../hooks/useDebounce";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const userInfo = useSelector((state) => state.users.userInfo);
  const [updateData, setUpdateData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const { open, handleOpen, handleClose } = useModal();
  const [tasksList, setTasksList] = useState([]);
  const [searchTasks, setSearchTasks] = useState("");
  const [queryData, setQueryData] = useState({
    filterArray: [],
    filterQuery: "",
    sortTask: "",
  });
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchTasks, 500);

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const res1 = await api.TASKS.searchByName({data: debouncedSearch});
      const res2 = await api.TASKS.searchByTitle({data: debouncedSearch});
      setTasksList(_.uniqBy([...res1, ...res2], "id"));
    })();
  }, [debouncedSearch]);

  useEffect(() => {
    if (userInfo.role === "user") {
      setTasksList(
        tasks.data.filter((task) => task.userEmail === userInfo.email)
      );
    } else {
      setTasksList(tasks.data);
    }
  }, [userInfo, tasks]);

  useEffect(() => {
    (async () => {
      const res = await api.TASKS.sortAndFilter({ data: queryData });
      setTasksList(res);
    })();
  }, [queryData]);

  if (tasks.isLoading) {
    return <>Loading...</>;
  }

  const handleUpdate = (item) => {
    setIsUpdate(true);
    setUpdateData((prev) => ({ ...prev, ...item }));
    handleOpen();
  };

  const handleChangeSearch = (e) => {
    setSearchTasks(e.target.value);
  };

  const handleSort = async (e) => {
    setQueryData({ ...queryData, sortTask: e.target.value });
  };

  const handleFilter = async (e) => {
    const { checked, value } = e.target;
    let tempArr;
    if (checked) {
      tempArr = [...queryData.filterArray, value];
    } else {
      tempArr = queryData.filterArray.filter((item) => item !== value);
    }
    const query = tempArr.map((item) => `status=${item}`).join("&");
    setQueryData({ ...queryData, filterArray: tempArr, filterQuery: query });
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
                <br />
                <br />

                <div className="flex gap-5">
                  <label>Filter By Starus: </label>
                  <div>
                    <input
                      type="checkbox"
                      value={"completed"}
                      onChange={handleFilter}
                    />{" "}
                    <label>completed</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value={"pending"}
                      onChange={handleFilter}
                    />{" "}
                    <label>pending</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value={"in progress"}
                      onChange={handleFilter}
                    />{" "}
                    <label>in progress</label>
                  </div>
                </div>
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
