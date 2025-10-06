import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Conversation } from "./Conversation";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";


export const Sidbar = ({
  socket,
  conversation,
  currentUser,
  room,
  setRoom,
  setUsername,
}) => {

  const {setCurrentChat} = useContext(authContext)



  const handleConversationClick = (c) => {
    console.log(setCurrentChat)
    setCurrentChat(c);
  };

  

  return (
    <div className=" relative w-full bg-white   flex">
      <div id="head" className=" w-full flex flex-col h-full  ">
        <div className="border-l border-t rounded-tl-md  py-1 px-3 h-full">
          {conversation?.map((c) => {
            return (
              <div
              key={c._id}
                id="people"
                onClick={() => handleConversationClick(c)}
                className="  w-full "
              >
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            );
          })}
        </div>
      </div>
      <div className=" absolute right-5 bottom-5 ">
        <img src="/add-chat.png" alt="newchat" className=" w-10 h-10 sm:hidden object-cover"  />
      </div>
    </div>
  );
};
