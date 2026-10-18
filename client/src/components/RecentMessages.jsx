import React, { useEffect, useState } from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
const RecentMessages = () => {
  const [messages, setMeassages] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  const fetchRecentMessages = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/messages/recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const groupedMessages = data.messages.reduce((acc, message) => {
          const senderId = message.from_user_id._id;
          if (
            !acc[senderId] ||
            new Date(message.createdAt) > new Date(acc[senderId].createdAt)
          ) {
            acc[senderId] = message;
          }
          return acc;
        }, {});

        const sortedMessages = Object.values(groupedMessages).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setMeassages(sortedMessages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecentMessages();
      const interval = setInterval(fetchRecentMessages, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);
  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
      <h3 className="font-semibold text-slate-8 mb-4">Recent messages</h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
        {messages.map((message, index) => (
          <Link
            key={message._id || index}
            to="/messages"
            className="flex items-center gap-2 py-2 px-2 hover:bg-slate-100 rounded"
          >
            <img
              src={message.from_user_id?.profile_picture}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {message.from_user_id?.full_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{message.text}</p>
            </div>

            <span className="text-xs text-gray-400 whitespace-nowrap">
              {moment(message.createdAt).fromNow()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
