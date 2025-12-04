import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ user, onRefresh }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user.id) return;
    navigate(`${user.id}/tasks`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="group p-4 sm:p-5 rounded-xl shadow-sm bg-white border-l-4 hover:shadow-md 
                   transition-all duration-300 border border-gray-300 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center 
                          text-purple-600 text-lg font-bold overflow-hidden"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.name?.charAt(0).toUpperCase()
            )}
          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-medium truncate text-gray-800">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>

            <p className="text-xs font-medium mt-1 px-2 py-0.5 inline-block rounded-full bg-purple-100 text-purple-800">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
