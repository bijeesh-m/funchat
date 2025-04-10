import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false); // Modal visibility state
  const [searchTerm, setSearchTerm] = useState(''); // Search input state
  const [users, setUsers] = useState([
    // Example static user data (replace with API data)
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
  ]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to start a conversation
  const startConversation = (userName) => {
    alert(`Starting a conversation with ${userName}`);
    // Replace with your chat logic here
  };

  // Open/close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Optional: Fetch users from an API (uncomment and adjust as needed)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);


    return (
        <div className=" flex items-center justify-between  text-xl font-bold p-5 ">
            <p className="bg-gradient-to-r font-mono from-green-700 to-pink-500 bg-clip-text text-transparent">
                FunChat
            </p>
            <Tooltip
                title="Add new chat"
                className=""
                onClick={() => document.getElementById("my_modal_2").showModal()}
                arrow
                col
            >
                {/* <AddIcon onClick={(onClick = { openModal })} className=" cursor-pointer" /> */}
            </Tooltip>
            <div>
                {/* Button to open modal */}
                {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Open User Modal
                </button> */}

                {/* Modal */}
                <dialog open={isOpen} className="modal bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                    <div className="flex flex-col gap-4">
                        {/* Search Section */}
                        <section className="user-search">
                            <h2 className="text-xl font-semibold mb-2">Start a Conversation</h2>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for users..."
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ul className="mt-2 max-h-48 overflow-y-auto">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <li key={user.id}>
                                            <button
                                                onClick={() => startConversation(user.name)}
                                                className="w-full text-left p-2 bg-gray-100 rounded-lg my-1 hover:bg-gray-200 transition-colors"
                                            >
                                                {user.name}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500 p-2">No users found</li>
                                )}
                            </ul>
                        </section>

                        {/* Close Button */}
                        <form method="dialog" className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};
