import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/bg/bg-coin.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { UserAuth } from "../store/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, resetPassword } = UserAuth();
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);

      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const forgotPasswordHandler = () => {
    const email = prompt("Please enter your email");
    resetPassword(email);
    alert("Email sent! Check your inbox for instructions");
  };

  return (
    <div className="h-screen  pt-20 md:flex justify-center items-center font-poppins relative">
      <div
        onClick={() => navigate("/")}
        className="absolute left-5 top-5 text-[32px] border px-2 rounded-2xl box-shadow bg-neutral-100 cursor-pointer"
      >
        <span className="gradient__text font-semibold">C~T~H</span>
      </div>
      <img
        src={bg}
        alt="background"
        className="absolute right-0 bottom-0 z-0"
      />
      <div className="border p-10 box-shadow">
        <h2 className="text-[28px] font-medium text-center text-textColor">
          Log in
        </h2>
        <p className="text-center text-[14px] text-textColor">
          Welcome back! Please enter your details
        </p>
        {error && (
          <p className="text-center text-red-500 w-[350px] text-[14px]">
            {error}
          </p>
        )}
        <form onSubmit={submitHandler} className="mt-10">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-[14px] text-slate-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              className="p-2 border-2 rounded w-[350px]"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-[14px] text-slate-600">
              password
            </label>
            <span className="relative block">
              <input
                id="password"
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                className="p-2 border-2 rounded w-[350px]"
                required
                onChange={e => setPassword(e.target.value)}
              />
              {showPassword && (
                <IoEyeOff
                  size={20}
                  className="absolute right-4  top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              )}
              {!showPassword && (
                <IoEye
                  size={20}
                  className="absolute right-4  top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </span>
            <p
              className="text-[14px] text-red-600 mt-1 cursor-pointer"
              onClick={forgotPasswordHandler}
            >
              Forgot password?
            </p>
          </div>
          <div className="w-[350px] mb-4">
            <button
              type="submit"
              className="p-2 w-full text-center bg-secondary rounded"
            >
              Log in
            </button>
          </div>
          <p className="text-center text-[14px]">
            Dont have an account?{" "}
            <Link to="/signup" className="t text-sky-400 underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
