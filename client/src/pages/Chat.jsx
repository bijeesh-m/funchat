import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { format } from "timeago.js";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Sidbar } from "../components/chat/Sidbar";
import { useAuth } from "../components/hooks/useAuth";

const Chat = () => {
  const [username, setUsername] = useState("");
  const [conversation, setConversation] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState(null);
  const [room, setRoom] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState([]);

  const socket = useRef();
  const { currentUser } = useAuth();

  const messagesEndRef = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    socket.current.on("typing", (userId) => {
      console.log("typing");
      setTypingUser((pre) => [...pre, userId]);
    });
    socket.current.on("stop typing", (userId) => {
      const user = typingUser.filter((tuser) => tuser !== userId);
      setTypingUser(user);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", currentUser?._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [currentUser]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage?.sender) &&
      setMessages((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = () => {
      axios
        .get(`conversation/${currentUser?._id}`)
        .then((res) => {
          setConversation(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getConversation();
  }, [currentUser?._id]);

  useEffect(() => {
    const getMessages = () => {
      axios
        .get(`/messages/${currentChat?._id}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const friendId = currentChat?.members?.find((m) => m !== currentUser?._id);
    const getUser = () => {
      if (currentChat) {
        axios
          .get(`/user?userId=${friendId}`)
          .then((res) => {
            setUsername(res.data?.username);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getUser();
  }, [currentChat, currentUser?._id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    const receiverId = currentChat?.members?.find(
      (member) => member !== currentUser?._id
    );
    socket.current.emit("sendMessage", {
      senderId: currentUser?._id,
      receiverId,
      text: newMessage,
    });
    try {
      await axios
        .post("/messages", message)
        .then((res) => {
          setMessages([...messages, res.data]);
          setNewMessage("");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    const receiverId = currentChat?.members?.find(
      (member) => member !== currentUser?._id
    );
    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", { senderId: currentUser?._id, receiverId });
    }
    const timeoutId = setTimeout(() => {
      setTyping(false);
      socket.current.emit("stop typing", {
        senderId: currentUser?._id,
        receiverId,
      });
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="  flex flex-grow h-full   ">
      <div
        className={`  ${
          currentChat ? "hidden sm:block" : "block"
        } w-full  md:w-2/6 bg-white   flex`}
      >
        <Sidbar
          socket={socket}
          setCurrentChat={setCurrentChat}
          conversation={conversation}
          currentUser={currentUser}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
        />
      </div>

      <div
        className={`  flex-1   ${
          currentChat ? "flex" : "hidden"
        }   flex-col justify-between    md:flex border-l border-t `}
      >
        {currentChat ? (
          <div className=" h-full flex justify-between flex-col ">
            <div className="   border-b px-5 py-5  flex items-center justify-between ">
              <div className=" flex items-center gap-5">
                <div className="sm:hidden" onClick={() => setCurrentChat(null)}>
                  <KeyboardBackspaceIcon />
                </div>
                <p className=" text-lg font-bold">{username}</p>
              </div>
              <div className=" flex gap-5">
                <LocalPhoneIcon fontSize="medium" />
                <VideocamIcon fontSize="medium" />
              </div>
            </div>

            <form
              onSubmit={handleSendMessage}
              className=" flex-1 h-full p-5 flex flex-col gap-3   overflow-hidden "
            >
              <div
                id="chat-container"
                className="   overflow-y-auto h-full    sm:pr-7"
              >
                {messages?.map((message) => {
                  return (
                    <div
                      className={`   ${
                        message?.sender === currentUser?._id
                          ? "flex justify-end  "
                          : ""
                      } w-full `}
                    >
                      <div>
                        <div
                          className={`py-1 w-fit px-4 m-3 bg-green-300 rounded-md`}
                        >
                          <p>{message.text}</p>
                        </div>
                        <div className={` w-fit px-4   `}>
                          <p className=" text-xs">
                            {format(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {typingUser.map((typingUser, index) => (
                  <div key={index} className="p-2 my-2 text-gray-500">
                    <span className="loading loading-dots loading-sm  m-3"></span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className=" flex gap-2">
                <TextField
                  size="small"
                  value={newMessage}
                  onChange={(e) => handleChange(e)}
                  name="message"
                  className=" bg-white rounded-md text-xs w-full"
                  placeholder="Write your message"
                />
                <button className=" flex-1">
                  <SendIcon fontSize="large" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className=" h-full w-full flex justify-center items-center text-6xl p-1 font-bold opacity-10">
            Open a conversation to start a chat
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;
