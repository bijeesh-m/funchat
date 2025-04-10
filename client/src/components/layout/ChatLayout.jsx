import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Header/NavBar";

export const ChatLayout = () => {
    return (
        <div className=" h-screen flex flex-col">
            <NavBar />
            <div className=" flex-grow ">
                <Outlet />
            </div>
        </div>
    );
};
