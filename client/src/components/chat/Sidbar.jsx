import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Conversation } from "./Conversation";

export const Sidbar = ({
  socket,
  conversation,
  setCurrentChat,
  currentUser,
  room,
  setRoom,
  setUsername,
}) => {
  const handleConversationClick = (c) => {
    setCurrentChat(c);
  };

  return (
    <div className=" w-full bg-white   flex">
      <div id="head" className=" w-full flex flex-col h-full  ">
        <div className="border-l border-t rounded-tl-md  py-1 px-3 h-full">
          {conversation?.map((c) => {
            return (
              <div
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
    </div>
  );
};
