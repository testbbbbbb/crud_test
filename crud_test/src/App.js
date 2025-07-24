import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", dob: "" });
  const [editingId, setEditingId] = useState(null);

  const apiUrl = "http://localhost/NewTest/API/user.php";

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
      password: user.password,
      dob: user.dob,
    });
    setEditingId(user.id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-primary">{editingId ? "Edit User" : "Add User"}</h2>

        <div className="row g-3">
          <div className="col-md-6">
            <input name="name" placeholder="Name" className="form-control" value={form.name} onChange={handleChange}/>
          </div>
          <div className="col-md-6">
            <input name="email" placeholder="Email" className="form-control" value={form.email} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input name="password" placeholder="Password" type="password" className="form-control" value={form.password} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input name="dob" type="date" className="form-control" value={form.dob} onChange={handleChange} />
          </div>
          <div className="col-12">
            <button className={`btn ${editingId ? "btn-warning" : "btn-primary"}`} onClick={editingId ? updateUser : addUser} >
              {editingId ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-secondary mb-3">User List</h3>
        <ul className="list-group">
          {users.map((u) => (
            <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{u.name}</strong> ({u.email}) - {u.dob}
              </div>
              <div>
                <button className="btn btn-sm btn-info me-2" onClick={() => editUser(u)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
