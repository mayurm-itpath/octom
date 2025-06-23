import FormInput from "../../../shared/Inputs/FormInput";
import DescriptionTextarea from "../../../shared/Textarea/DescriptionTextarea";
import BlueButton from "../../../shared/Buttons/BlueButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskValidation } from "../../../utils/validations";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../../redux/slices/tasks.slice";

const TasksForm = ({
  isUpdate,
  updateData,
  setUpdateInfo,
  openModal,
  handleCloseModal,
  fetchTableData
}) => {
  const userInfo = useSelector((state) => state.users.userInfo);
  const dispatch = useDispatch();
  const initialFormData = () => ({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(taskValidation),
    defaultValues: initialFormData(),
  });

  const onSubmit = async (data) => {
    if (isUpdate) {
      try {
        await dispatch(updateTask({ id: data.id, data }));
        setUpdateInfo((prev) => ({ ...prev, isUpdate: false }));
      } catch (error) {
        window.alert("Error while update task");
        console.log(error);
      }
    } else {
      try {
        const formData = {
          ...data,
          id: uuid(),
          userName: userInfo.name,
          userEmail: userInfo.email,
          status: "pending",
        };
        await dispatch(addTask(formData));
      } catch (error) {
        window.alert("Error while add task");
        console.log(error);
      }
    }
    reset(initialFormData());
    fetchTableData();
    handleCloseModal();
    return;
  };

  const closeModal = () => {
    setUpdateInfo((prev) => ({ ...prev, isUpdate: false }));
    reset(initialFormData());
    handleCloseModal();
  };

  useEffect(() => {
    if (isUpdate) {
      reset({
        id: updateData.id,
        title: updateData.title,
        description: updateData.description,
        dueDate: updateData.dueDate
          ? new Date(updateData.dueDate).toISOString().split("T")[0]
          : null,
        status: updateData.status,
      });
    } else {
      reset(initialFormData());
    }
  }, [updateData, isUpdate, reset]);

  return (
    <>
      <div
        className={`${
          openModal ? "flex" : "hidden"
        } h-[100vh] w-[100vw] fixed top-0 left-0 bg-black bg-opacity-30 justify-center items-center`}
      >
        <div className="p-5 rounded-xl fixed bg-white">
          <h2 className="text-3xl text-center font-bold">
            {isUpdate ? "Update Task" : "Add Task"}
          </h2>

          <form
            className="py-[30px] flex flex-col items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              type={"text"}
              placeholder={"Title"}
              {...register("title")}
              error={errors.title}
            />

            <DescriptionTextarea
              placeholder={"Description"}
              {...register("description")}
              error={errors.description}
            />

            <FormInput
              type={"date"}
              {...register("dueDate")}
              error={errors.dueDate}
            />

            <BlueButton type="submit" title={"Submit"} />

            <BlueButton title={"Close"} onClick={closeModal} />
          </form>
        </div>
      </div>
    </>
  );
};

export default TasksForm;
