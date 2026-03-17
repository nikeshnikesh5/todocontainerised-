const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: 'http://frontend:3000',  // This is the frontend service name and port in Docker
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  res.json(todos.rows);
});

app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const newTodo = await pool.query(
    "INSERT INTO todos (text) VALUES ($1) RETURNING *",
    [text]
  );
  res.json(newTodo.rows[0]);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));