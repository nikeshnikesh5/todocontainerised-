import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);



  const fetchTodos = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos`);
  setTodos(res.data);
};

const addTodo = async () => {
  if (!text) return;
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos`, { text });
  setText("");
  fetchTodos();
};

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;