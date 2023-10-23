import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3001/read")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreate = () => {
    axios
      .post("http://localhost:3001/create", { nome, email })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { nome, email })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>CRUD Example</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.nome} - {user.email}
            <button className="update" onClick={() => handleUpdate(user.id)}>
              Update
            </button>
            <button className="delete" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
