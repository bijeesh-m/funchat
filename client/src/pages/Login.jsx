import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/hooks/useAuth";

const Login = () => {
  const [formValues, setFormvalues] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { updateCurrentUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
  };

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/auth/login", formValues)
      .then((res) => {
        updateCurrentUser(res.data);
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data);
      });
  };
  return (
    <div className=" h-screen w-screen bg-white    flex items-center p-5">
      <form
        className=" w-full sm:w-1/2  mx-auto my-auto "
        onSubmit={handleLogin}
      >
        <h1 className=" font-bold text-2xl mb-10 text-center">Login</h1>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => handleChange(e)}
            value={formValues.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={formValues.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className=" btn btn-circle w-full">
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}{" "}
          Login
        </button>
        <p className=" text-center m-3">
          Don't have an account{" "}
          <Link className=" text-blue-600" to={"/register"}>
            register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
