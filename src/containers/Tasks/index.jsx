import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/tasks.slice";
import BlueButton from "../../shared/Buttons/BlueButton";
import TasksForm from "../../components/Forms/TasksForm";
import useModal from "../../hooks/useModal";
import TasksTable from "../../components/Tables/TasksTable";
import SearchSortFilter from "../../components/SearchSortFilter";
import useDebounce from "../../hooks/useDebounce";

const initialState = {
  _page: 1,
  _limit: 5,
};

const Tasks = () => {
  const userInfo = useSelector((state) => state.users.userInfo);
  const tasks = useSelector((state) => state.tasks.tasks);
  const { open, handleOpen, handleClose } = useModal();
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState(initialState);
  const [updateInfo, setUpdateInfo] = useState({
    updateData: {},
    isUpdate: false,
  });

  const [searchTask, setSearchTask] = useState(''); // Search task state
  const debounceSearch = useDebounce(searchTask, 500); // Deboounce search task state

  const finalFilterState = useMemo(() => {
    const clone = { ...filterState };
    const finalFilterArray = Object.entries(clone).filter(
      ([key, value]) => !!key && !!value
    );
    return Object.fromEntries(finalFilterArray);
  }, [filterState]);

  const fetchTableData = useCallback(() => {
    if (userInfo.role === "user") {
      dispatch(
        fetchTasks({
          params: {
            ...finalFilterState,
            userEmail: userInfo.email,
          },
        })
      );
    } else {
      dispatch(
        fetchTasks({
          params: {
            ...finalFilterState,
            q: debounceSearch
          },
        })
      );
    }
  }, [dispatch, finalFilterState, userInfo, debounceSearch]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handleUpdate = (item) => {
    setUpdateInfo({ updateData: item, isUpdate: true });
    handleOpen();
  };

  // Search task
  const handleSearch = (e) =>  {
    setSearchTask(e.target.value);
  };

  // Filter or sort tasks
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilterState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Sort table
  const handleSort = useCallback((value) => {
    if (filterState?._sort === value) {
      setFilterState((prev) => ({ ...prev, _sort: "" }));
    } else {
      setFilterState((prev) => ({ ...prev, _sort: value }));
    }
  }, [filterState]);

  // pagination previous page
  const handlePrevious = () => {
    if (filterState._page > 1) {
      setFilterState({ ...filterState, _page: filterState._page - 1 });
    }
  };

  // pagination next page
  const handleNext = () => {
    if (tasks.data.length) {
      setFilterState({ ...filterState, _page: filterState._page + 1 });
    }
  };

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          {userInfo.role === "admin" ? (
            <SearchSortFilter
              handleFilterChange={handleFilterChange}
              filterState={filterState}
              searchTask={searchTask}
              handleSearch={handleSearch}
            />
          ) : (
            <>
              <h2 className="text-xl font-bold">Welcome {userInfo.name},</h2>
              <div className="text-lg font-bold">
                Email Id: {userInfo.email}
              </div>
              <br />

              <div>
                <BlueButton title={"Add Task"} onClick={handleOpen} />
              </div>
            </>
          )}

          <TasksTable
            tasks={tasks}
            userInfo={userInfo}
            handleUpdate={handleUpdate}
            handleSort={handleSort}
            fetchTableData={fetchTableData}
          />

          {/* pagination */}
          <div className="flex items-center gap-5">
            <BlueButton title={"Previous"} onClick={handlePrevious} />
            <span>{`Page ${filterState._page}`}</span>
            <BlueButton title={"Next"} onClick={handleNext} />
          </div>

          {/* Add or update tasks form */}
          <TasksForm
            isUpdate={updateInfo.isUpdate}
            setUpdateInfo={setUpdateInfo}
            updateData={updateInfo.updateData}
            openModal={open}
            handleCloseModal={handleClose}
            fetchTableData={fetchTableData}
          />
        </div>
      </section>
    </>
  );
};

export default Tasks;
