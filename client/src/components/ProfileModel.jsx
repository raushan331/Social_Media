import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

const ProfileModel = ({ setShowEdit }) => {
  const user = dummyUserData;

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit profile
          </h1>
          <form action="" className="space-y-4" onSubmit={handleSaveProfile}>
            {/* Profile picture */}

            <div className="flex flex-col items-start gap-3">
              <label
                htmlFor="profile_picture"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile picture
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  id="profile_picture"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      profile_picture: e.currentTarget.files[0],
                    })
                  }
                />
                <div className="group/profile relative">
                  <img
                    src={
                      editForm.profile_picture
                        ? URL.createObjectURL(editForm.profile_picture)
                        : user.profile_picture
                    }
                    alt=""
                    className="w-24 h-24 rounded-full object-cover mt-2"
                  />

                  <div className="absolute inset-0 hidden group-hover/profile:flex bg-black/20 rounded-full items-center justify-center cursor-pointer">
                    <Pencil className="w-5 h-5 text-white" />
                  </div>
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div className="flex flex-col items-start gap-3">
              <label
                htmlFor="cover_photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cover photo
              </label>

              <input
                type="file"
                accept="image/*"
                id="cover_photo"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setEditForm((prev) => ({
                      ...prev,
                      cover_photo: file,
                    }));
                  }
                }}
              />

              <label
                htmlFor="cover_photo"
                className="group/cover relative block w-full max-w-md cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo || undefined
                  }
                  alt="Cover photo"
                  className="w-full h-40 rounded-lg object-cover bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover/cover:bg-black/30">
                  <div className="rounded-full bg-black/40 p-3 opacity-0 transition-opacity group-hover/cover:opacity-100">
                    <Pencil className="h-6 w-6 text-white" />
                  </div>
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium font-gray-700 mb-1"
              >
                Name
              </label>

              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter your full name"
                oonChange={(e) =>
                  setEditForm({
                    ...editForm,
                    full_name: e.target.value,
                  })
                }
                value={editForm.full_name}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium font-gray-700 mb-1"
              >
                Username
              </label>

              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter your  username"
                oonChange={(e) =>
                  setEditForm({
                    ...editForm,
                    username: e.target.value,
                  })
                }
                value={editForm.username}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium font-gray-700 mb-1"
              >
                Bio
              </label>

              <textarea
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter a short bio"
                oonChange={(e) =>
                  setEditForm({
                    ...editForm,
                    bio: e.target.value,
                  })
                }
                value={editForm.bio}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium font-gray-700 mb-1"
              >
                Location
              </label>

              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter your location"
                oonChange={(e) =>
                  setEditForm({
                    ...editForm,
                    location: e.target.value,
                  })
                }
                value={editForm.location}
              />
            </div>

            <div
              onClick={() => setShowEdit(false)}
              type="button"
              className="flex justify-end space-x-3 pt-6"
            >
              <button className="px-4 py-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
