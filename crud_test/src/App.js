import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", dob: "" });
  const [editingId, setEditingId] = useState(null);

  const apiUrl = "http://localhost/API/user.php";

  const fetchUsers = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setUsers(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", password: "", dob: "" });
    fetchUsers();
  };

  const updateUser = async () => {
    await fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify({ ...form, id: editingId }),
    });
    setForm({ name: "", email: "", password: "", dob: "" });
    setEditingId(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(apiUrl, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  const editUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: "", // password not fetched
      dob: user.dob,
    });
    setEditingId(user.id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>{editingId ? "Edit User" : "Add User"}</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} />
      <button onClick={editingId ? updateUser : addUser}>
        {editingId ? "Update User" : "Add User"}
      </button>

      <h3>User List</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}) - {u.dob}{" "}
            <button onClick={() => editUser(u)}>Edit</button>{" "}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
