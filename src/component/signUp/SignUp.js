import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import image1 from "./G.png";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const SignUp = () => {
  const { createUser, updateUser, GoogleSingIn } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState("");
  const location = useLocation();
  const Navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const signUpSubmit = (data) => {
    const info = {
      displayName: data.name,
    };
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUser(info);
        Navigate(from, { replace: true });
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  const googleWithSign = () => {
    GoogleSingIn(googleProvider)
      .then((result) => {
        const user = result.user;
        Navigate(from, { replace: true });
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };
  return (
    <div className="h-[800px] flex  justify-center items-center">
      <div className="w-96 p-9 rounded-md shadow-2xl bg-violet-100 ">
        <h1 className="text-3xl text-center font-bold text-violet-500">
          {" "}
          Sign Up{" "}
        </h1>
        <form onSubmit={handleSubmit(signUpSubmit)}>
          <div className="form-control w-full   max-w-xs">
            <label className="label">
              <span className="label-text font-bold text-violet-500">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your email"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p role="alert" className="text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>

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
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message: "password must be strong",
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
          <div>{error && <p className="text-red-500">{error}</p>}</div>
          <input
            className="w-full font-bold bg-violet-700 hover:bg-violet-900 cursor-pointer mt-2 text-white text-center p-3 rounded-lg"
            value="Sign Up"
            type="submit"
          />
        </form>

        <div className="flex flex-col w-full border-opacity-50">
          <p className="mt-3 text-orange-500 font-medium">
            TASK DESCRIPTION ?{" "}
            <Link to="/login" className=" text-blue-600">
              i have already account
            </Link>
          </p>
          <div className="divider">OR</div>
          <div
            onClick={googleWithSign}
            className="grid  py-4 cursor-pointer hover:bg-slate-400 hover:font-bold  card rounded-xl border-2 border-accent place-items-center font-semibold"
          >
      
            <img className="w-12 h-12 flex" src={image1} alt="" /> CONTINUE WITH
            GOOGLE
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
