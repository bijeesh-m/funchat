import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Modal visibility state
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [users, setUsers] = useState([]);
  const {setCurrentChat} = useContext(authContext)

  // Filter users based on search term
  const filteredUsers = users?.filter((user) =>
    user?.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to start a conversation
  const startConversation = (userName) => {
    // alert(`Starting a conversation with ${userName}`);
    setCurrentChat()
    // Replace with your chat logic here
  };

  // Open/close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Optional: Fetch users from an API (uncomment and adjust as needed)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/users");
        console.log("data :",response);
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className=" flex  relative items-center justify-between  text-xl font-bold p-5 ">
      <p className="bg-gradient-to-r font-mono from-green-700 to-pink-500 bg-clip-text text-transparent">
        FunChat
      </p>
      <Tooltip
        title="Add new chat"
        className=" cursor-pointer"
        onClick={() => setIsOpen(true)}
        arrow
      >
        New Chat
      </Tooltip>
      {
        <div
          className={` ${
            isOpen && "translate-y-0 duration-700"
          } py-5 hidden sm:block -translate-y-[120%] absolute top-17   left-0  z-50 w-full   `}
        >
          <section className={`  py-20 text-sm bg-black rounded-md  px-5 w-xl mx-auto`}>
            <h2 className=" text-lg font-semibold  text-white mb-2">
              Start a New Conversation
            </h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for users..."
              className="w-full border-white text-white p-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul className="mt-2 max-h-full overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li key={user._id}>
                    <button
                      onClick={() => {
                        startConversation(user.name);
                        setIsOpen(false);
                      }}
                      className="w-full cursor-pointer text-left p-2 bg-gray-100 rounded-lg my-1 hover:bg-gray-200 transition-colors"
                    >
                      {user.username}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 p-2">No users found</li>
              )}
            </ul>
          </section>
        </div>
      }
    </div>
  );
};
