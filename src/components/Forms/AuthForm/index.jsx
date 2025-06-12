import FormInput from "../../../shared/Inputs/FormInput";
import {
  registerValidation,
  loginValidation,
} from "../../../utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../api/client";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../../redux/slices/users.slice";
import BlueButton from "../../../shared/Buttons/BlueButton";
import { Link, useNavigate } from "react-router-dom";
import { URLS } from "../../../constants/urls";

const AuthForm = ({ isLogin }) => {
  const validationSchema = isLogin ? loginValidation : registerValidation;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = isLogin
    ? {
        email: "",
        password: "",
      }
    : {
        id: Date.now().toString(),
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormData,
  });

  const onSubmit = async (data) => {
    if (isLogin) {
      try {
        // const res = await api.USERS.getUserByEmail({ data });
        // if (res[0].password === data.password) {
        //   dispatch(login(res[0]));
        //   navigate(URLS.INITIAL);
        // } else {
        //   window.alert("Invalid Login Info");
        // }
        await dispatch(loginUser(data));
        navigate(URLS.INITIAL);
      } catch (error) {
        window.alert("Error while login");
        console.log(error);
      }
    } else {
      try {
        const res = await api.USERS.getUserByEmail({ data });
        if (res[0]?.email === data?.email) {
          window.alert("Email already exist");
        } else {
          await dispatch(registerUser(data));
          navigate(URLS.INITIAL);
        }
      } catch (error) {
        window.alert("Error while Register");
        console.log(error);
      }
    }
  };

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          <h2 className="text-3xl text-center font-bold">
            {isLogin ? "Log In" : "Register"}
          </h2>

          <form
            className="py-[30px] flex flex-col items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {isLogin ? (
              <></>
            ) : (
              <FormInput
                type={"text"}
                placeholder={"Name"}
                {...register("name")}
                error={errors.name}
              />
            )}

            <FormInput
              type={"email"}
              placeholder={"Email Id"}
              {...register("email")}
              error={errors.email}
            />

            {isLogin ? (
              <></>
            ) : (
              <div>
                <label>Role: </label>
                <span>
                  <input type="radio" value={"user"} {...register("role")} />{" "}
                  <label>User</label>
                </span>{" "}
                <span>
                  <input type="radio" value={"admin"} {...register("role")} />{" "}
                  <label>Admin</label>
                </span>
                <div className="text-red">{errors.role?.message}</div>
              </div>
            )}

            <FormInput
              type={"password"}
              placeholder={"Password"}
              {...register("password")}
              error={errors.password}
            />

            {isLogin ? (
              <></>
            ) : (
              <FormInput
                type={"password"}
                placeholder={"Confirm Password"}
                {...register("confirmPassword")}
                error={errors.confirmPassword}
              />
            )}

            <Link to={URLS.FORGOTPASSWORD} className="text-blue underline">
              Forgot Password
            </Link>

            <BlueButton type="submit" title={isLogin ? "Log In" : "Register"} />
          </form>
        </div>
      </section>
    </>
  );
};

export default AuthForm;
