import "./index.css";
import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { ChatLayout } from "./components/layout/ChatLayout";
import Landing from "./components/Landing";
import LandingPage from "./pages/LandingPage";
import LandingLayout from "./components/layout/LandingLayout";
// import Formik from "./components/Formik";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
    return (
        <div className="">
            <Toaster />
            <Routes>
                <Route path="/" element={<LandingLayout />}>
                    <Route index element={<LandingPage />} />
                </Route>
                <Route path="/home" element={<ChatLayout />}>
                    <Route index element={<Chat />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            {/* <Formik /> */}
        </div>
    );
}

export default App;
