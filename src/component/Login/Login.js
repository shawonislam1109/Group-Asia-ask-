import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image2 from "../signUp/G.png";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const { GoogleSingIn, LoginUser } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const location = useLocation();
  const Navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  const loginSubmit = (data) => {
    console.log(data);

    LoginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.message);
      });
  };

  const googleSing = () => {
    GoogleSingIn(googleProvider)
      .then((result) => {
        const user = result.user;
        setLoginError("");
        console.log(user);
        Navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.message);
      });
  };
  return (
    <div className="h-[800px] flex  justify-center items-center px-2 md:px-0">
      <div className="w-96 p-9 rounded-md shadow-2xl bg-violet-100 ">
        <h1 className="text-3xl text-center font-bold text-violet-500">
        
          Log In
        </h1>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <div className="form-control w-full   max-w-xs">
            <label className="label">
              <span className="label-text font-bold text-violet-500">
                Email
              </span>
            </label>
            <input
              {...register("email", { required: "Email Address is required" })}
              type="text"
              placeholder="Your email"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p role="alert" className="text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full   max-w-xs">
            <label className="label">
              <span className="label-text font-bold text-violet-500">
                Password
              </span>
            </label>
            <input
              {...register("password", {
                required: "password  is required",
                minLength: {
                  value: 6,
                  message: " you password must be 6 character & longer ",
                },
              })}
              type="password"
              placeholder="Your password"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label mt-2">
              <span className="label-text">Forget password</span>
            </label>
            {errors.password && (
              <p role="alert" className="text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>
          <input
            className="w-full font-bold bg-violet-700 hover:bg-violet-900 cursor-pointer mt-2 text-white text-center p-3 rounded-lg"
            value="Log In"
            type="submit"
          />
        </form>
        <div className="flex flex-col w-full border-opacity-50">
          <p className="mt-3 text-orange-500 font-medium">
            TASK DESCRIPTION ?{" "}
            <Link to="/signup" className=" text-blue-600">
              create new account
            </Link>
          </p>
          <div className="divider">OR</div>
          <div
            onClick={googleSing}
            className="grid py-4 cursor-pointer hover:bg-slate-400 hover:font-bold  card rounded-xl border-2 border-accent place-items-center"
          >
            {" "}
            <img className="w-12 h-12" src={image2} alt="" /> CONTINUE WITH
            GOOGLE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
