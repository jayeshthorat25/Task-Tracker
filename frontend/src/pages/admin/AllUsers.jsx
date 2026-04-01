import { HomeIcon, Search, CalendarIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import UserCard from "../../components/UserCard";
import useDebounce from "../../hooks/useDebounce";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Debounced search value
  const debouncedSearch = useDebounce(search, 500);

  const fetchUsers = async (query = "") => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/all_users?search=${query}`);
      setUsers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users initially and when search changes (debounced)
  useEffect(() => {
    fetchUsers(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="p-4 md:p-6 min-h-screen overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <HomeIcon className="text-purple-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />
            <span className="truncate">All Users</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-7 truncate">
            View all users
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-white p-4 rounded-xl shadow-sm mb-4 gap-3 border border-purple-100">
        <Search className="text-purple-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* USER LIST */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 bg-white rounded-xl shadow-sm border border-purple-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Users Found
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              No users match your search.
            </p>
          </div>
        ) : (
          users.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}

export default AllUsers;
