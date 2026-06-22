import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/ManageUser.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeRole = async (id) => {
    try {
      await api.put(`/users/${id}/role`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="manage-users">
        <h1>👥 Manage Users</h1>

        <input
          type="text"
          placeholder="Search User"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-box"
        />

        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div
              className="user-card"
              key={user._id}
            >
              <h2>{user.username}</h2>

              <p>{user.email}</p>

              <h3>
                Role : {user.role}
              </h3>

              <div className="user-actions">
                <button
                  className="role-btn"
                  onClick={() =>
                    changeRole(user._id)
                  }
                >
                  🔄 Change Role
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteUser(user._id)
                  }
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageUsers;