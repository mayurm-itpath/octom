import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/tasks.slice";
import BlueButton from "../../shared/Buttons/BlueButton";
import TasksForm from "../../components/Forms/TasksForm";
import useModal from "../../hooks/useModal";
import TasksTable from "../../components/Tables/TasksTable";
import _ from "lodash";
import SearchSortFilter from "../../components/SearchSortFilter";

const Tasks = () => {
  const userInfo = useSelector((state) => state.users.userInfo);
  const { open, handleOpen, handleClose } = useModal();
  const dispatch = useDispatch();

  const [updateInfo, setUpdateInfo] = useState({
    updateData: {},
    isUpdate: false,
  });

  // Fetch tasks
  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  const handleUpdate = (item) => {
    setUpdateInfo({ updateData: item, isUpdate: true });
    handleOpen();
  };

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          {userInfo.role === "admin" ? (
            <SearchSortFilter />
          ) : (
            <>
              <div>
                <BlueButton title={"Add Task"} onClick={handleOpen} />
              </div>
            </>
          )}

          <TasksTable userInfo={userInfo} handleUpdate={handleUpdate} />

          <TasksForm
            isUpdate={updateInfo.isUpdate}
            setUpdateInfo={setUpdateInfo}
            updateData={updateInfo.updateData}
            openModal={open}
            handleCloseModal={handleClose}
          />
        </div>
      </section>
    </>
  );
};

export default Tasks;
