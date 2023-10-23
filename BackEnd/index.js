const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure o CORS para permitir solicitações do seu aplicativo React
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

app.post("/create", (req, res) => {
  const { nome, email } = req.body;
  db.query(
    "INSERT INTO user (nome, email) VALUES (?, ?)",
    [nome, email],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error creating user");
      } else {
        res.status(200).send("User created successfully");
      }
    }
  );
});

app.get("/read", (req, res) => {
  db.query("SELECT * FROM user", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching data");
    } else {
      res.status(200).json(rows);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const { nome, email } = req.body;
  const userId = req.params.id;
  db.query(
    "UPDATE user SET nome = ?, email = ? WHERE id = ?",
    [nome, email, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating user");
      } else {
        res.status(200).send("User updated successfully");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting user");
    } else {
      res.status(200).send("User deleted successfully");
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
