import axios from "axios";
import { useEffect, useState } from "react";

export const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation?.members?.find((m) => m !== currentUser._id);
        const getUser = () => {
            axios
                .get(`/user?userId=${friendId}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, [currentUser, conversation]);
    return (
            <div className="  w-full hover:bg-slate-100 hover:rounded-md" >
                <button className=" w-full  p-3 justify-between gap-5 flex items-center">
                    <div className=" flex items-center">
                        <div className=" w-10 h-10 rounded-full bg-black"></div>
                        <p className=" p-2 text-lg">{user?.username}</p>
                    </div>
                    <span class="inline-flex items-center justify-center min-h-5 min-w-5 p-0.5 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                        
                    </span>
                </button>
            </div>
    );
};
