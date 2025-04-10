import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formValues, setFormvalues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalues({ ...formValues, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        axios
            .post("/auth/register", formValues)
            .then((res) => {
                navigate("/login");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className=" h-screen w-screen bg-white    flex items-center p-5">
            <form className=" w-full sm:w-1/2  mx-auto my-auto " onSubmit={handleRegister}>
                <h1 className=" font-bold text-2xl mb-10 text-center">Register</h1>

                <div className="mb-5">
                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 ">
                        Your username
                    </label>
                    <input
                        type="username"
                        id="username"
                        onChange={(e) => handleChange(e)}
                        value={formValues.username}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="username"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">
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
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">
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
                    Register
                </button>
                <p className=" text-center m-3">
                    Already have an account{" "}
                    <Link className=" text-blue-600" to={"/login"}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
