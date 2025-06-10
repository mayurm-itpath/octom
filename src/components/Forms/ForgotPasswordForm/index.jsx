import FormInput from "../../../shared/Inputs/FormInput";
import BlueButton from "../../../shared/Buttons/BlueButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidation } from "../../../utils/validations";
import { api } from "../../../api/client";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../constants/urls";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidation),
  });

  const onSubmit = async (data) => {
    const isEmailExist = await api.USERS.getUserByEmail({ data });
    if (isEmailExist[0]) {
      await api.USERS.changePassword({ id: isEmailExist[0].id, data });
      navigate(URLS.LOGIN);
    } else {
      window.alert('Error while change password');
    }
  };

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          <h2 className="text-2xl text-center font-bold">Forgot Password</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-[30px] flex flex-col items-center gap-5"
          >
            <FormInput
              type={"email"}
              placeholder={"Email Id"}
              {...register("email")}
              error={errors.email}
            />

            <FormInput
              type={"password"}
              placeholder={"New Password"}
              {...register("password")}
              error={errors.password}
            />

            <FormInput
              type={"password"}
              placeholder={"Confirm Password"}
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />
            <BlueButton type="submit" title={"Submit Changes"} />
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordForm;
