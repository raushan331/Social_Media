// import React, { useState } from "react";
// import { Heart, MessageCircle, Share2, BadgeCheck } from "lucide-react";
// import moment from "moment";
// import { dummyUserData } from "../assets/assets";
// import { useSelector } from "react-redux";
// import { useAuth } from "@clerk/clerk-react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// const PostCard = ({ post }) => {
//   const postWithHastage = post.content.replace(
//     /(#\w+)/g,
//     '<span className = "text-indigo-600>$1</span>',
//   );
//   const currentUser = useSelector((state) => state.user.value);
//   const [likes, setLikes] = useState(post.likes_count);

//   const { getToken } = useAuth();

//   const handleLike = async () => {
//     try {
//       const { data } = await api.post(
//         "/api/post/like",
//         { postId: post._id },
//         { headers: { Authorization: `Bearer ${await getToken()}` } },
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setLikes((prev) => {
//           if (prev.includes(currentUser._id)) {
//             return prev.filter((id) => id !== currentUser._id);
//           } else {
//             return [...prev, currentUser._id];
//           }
//         });
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       alert("Link copied successfully!");
//     } catch {
//       alert("Unable to copy link.");
//     }
//   };

//   return (
//     <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//       {/* User information */}
//       <div className="flex items-center gap-3 mb-4">
//         <img
//           src={post.user?.profile_picture || ""}
//           alt="Profile"
//           className="w-10 h-10 rounded-full object-cover"
//         />

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-1">
//             <span className="font-semibold text-gray-800">
//               {post.user?.full_name || "User"}
//             </span>
//             <BadgeCheck className="w-4 h-4 text-blue-500" />
//           </div>

//           <p className="text-sm text-gray-500">{post.user?.username || ""}</p>

//           <p className="text-xs text-gray-400">
//             Posted {moment(post.createdAt || post.createAt).fromNow()}
//           </p>
//         </div>
//       </div>

//       {/* Post content */}
//       {post.content && (
//         <div
//           className="text-gray-700 text-sm whitespace-pre-line mb-4"
//           dangerouslySetInnerHTML={{
//             __html: post.content,
//           }}
//         />
//       )}

//       {/* Post images */}
//       {post.image_urls?.length > 0 && (
//         <div
//           className={`grid gap-2 mb-4 ${
//             post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"
//           }`}
//         >
//           {post.image_urls.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Post image ${index + 1}`}
//               className="w-full max-h-96 object-cover rounded-lg"
//             />
//           ))}
//         </div>
//       )}

//       {/* Like, Comment and Share buttons */}
//       <div className="flex items-center gap-6 border-t border-gray-200 pt-3 text-sm text-gray-600">
//         <button
//           type="button"
//           onClick={handleLike}
//           className={`flex items-center gap-2 cursor-pointer transition ${
//             likes ? "text-red-500" : "text-gray-600 hover:text-red-500"
//           }`}
//         >
//           <Heart className="w-5 h-5" fill={likes ? "currentColor" : "none"} />
//           <span>{likes.length} Likes</span>
//         </button>

//         <button
//           type="button"
//           onClick={() => alert("Comment feature coming soon!")}
//           className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition"
//         >
//           <MessageCircle className="w-5 h-5" />
//           <span>Comment</span>
//         </button>

//         <button
//           type="button"
//           onClick={handleShare}
//           className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition"
//         >
//           <Share2 className="w-5 h-5" />
//           <span>Share</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

import React, { useState } from "react";
import { Heart, MessageCircle, Share2, BadgeCheck } from "lucide-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const postWithHashtag = (post.content || "").replace(
    /(#\w+)/g,
    '<span class="text-indigo-600">$1</span>',
  );

  const currentUser = useSelector((state) => state.user.value);
  const { getToken } = useAuth();

  // likes ek array of user IDs hona chahiye
  const [likes, setLikes] = useState(
    Array.isArray(post.likes_count) ? post.likes_count : [],
  );

  const isLiked = likes.includes(currentUser?._id);

  const handleLike = async () => {
    try {
      const { data } = await api.post(
        "/api/post/like",
        { postId: post._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );

      if (data.success) {
        toast.success(data.message);
        setLikes((prev) => {
          if (prev.includes(currentUser._id)) {
            return prev.filter((id) => id !== currentUser._id);
          } else {
            return [...prev, currentUser._id];
          }
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied successfully!");
    } catch {
      toast.error("Unable to copy link.");
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      {/* User information */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.user?.profile_picture || ""}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800">
              {post.user?.full_name || "User"}
            </span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>

          <p className="text-sm text-gray-500">{post.user?.username || ""}</p>

          <p className="text-xs text-gray-400">
            Posted {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Post content */}
      {post.content && (
        <div
          className="text-gray-700 text-sm whitespace-pre-line mb-4"
          dangerouslySetInnerHTML={{ __html: postWithHashtag }}
        />
      )}

      {/* Post images */}
      {post.image_urls?.length > 0 && (
        <div
          className={`grid gap-2 mb-4 ${
            post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post.image_urls.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post image ${index + 1}`}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Like, Comment and Share buttons */}
      <div className="flex items-center gap-6 border-t border-gray-200 pt-3 text-sm text-gray-600">
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-2 cursor-pointer transition ${
            isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
          <span>{likes.length} Likes</span>
        </button>

        <button
          type="button"
          onClick={() => toast("Comment feature coming soon!")}
          className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
