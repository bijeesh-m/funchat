import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Conversation } from "./Conversation";

export const Sidbar = ({ socket, conversation, setCurrentChat, currentUser, room, setRoom, setUsername }) => {
    

    return (
        <div className=" w-full h-full md:w-2/6 bg-white  flex">
            <div className=" flex items-end px-2 py-3">
                <AccountCircleIcon />
            </div>
            <div id="head" className=" w-full flex flex-col h-full ">
                
                <div className="border-l border-t rounded-tl-md  py-1 px-3 h-full">
                    {conversation?.map((c) => {
                        return (
                            <div id="people" onClick={() => setCurrentChat(c)} className="  w-full ">
                                <Conversation conversation={c} currentUser={currentUser} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
