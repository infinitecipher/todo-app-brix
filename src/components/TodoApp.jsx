import React, { useCallback, useEffect, useMemo, useState } from "react";

const TodoApp = () => {
  const [textInput, setTextInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [action, setAction] = useState("all");
  const [checkAll, setCheckAll] = useState(false);

  //Add function
  const addTodo = () => {
    if (textInput.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: textInput, completed: false },
      ]);
      setTextInput("");
    }
  };

  // toggle complete
  const toggleComplete = useCallback(
    (id) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    },
    [todos]
  );

  // update todo
  const updateTodo = useCallback(
    (id, newText) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
    },
    [todos]
  );

  // Delete todo
  const deleteTodo = useCallback(
    (id) => {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    },
    [todos]
  );

  useEffect(() => {
    const filteredTodos = todos.filter(
      (todoFilter) => todoFilter.completed === false
    );

    setCount(filteredTodos.length);
  }, [action, todos]);

  const clearCompleted = () => {
    const filteredTodos = todos.filter((todo) => todo.completed !== true);
    setTodos(filteredTodos);
  };

  const renderListItems = useMemo(() => {
    return (
      <ol>
        {todos
          .filter((todoFilter) =>
            action === "completed"
              ? todoFilter.completed === true
              : action === "active"
              ? todoFilter.completed === false
              : todoFilter
          )
          .map((todo, index) => {
            return (
              <li key={`${todo.id}`}>
                <input
                  key={`checkbox-${index}`}
                  type="checkbox"
                  checked={todo.completed}
                  data-testid={`item-checkbox-${index}`}
                  onChange={() => toggleComplete(todo.id)}
                />
                <input
                  type="text"
                  data-testid={`item-input-${index}`}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                  value={todo.text}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  disabled={todo.completed}
                />
                <button
                  data-testid="item-delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  X
                </button>
              </li>
            );
          })}
      </ol>
    );
  }, [action, deleteTodo, todos, toggleComplete, updateTodo]);

  const toggleAll = () => {
    if (!checkAll) {
      const updatedTodos = todos.map((todo) =>
        true ? { ...todo, completed: true } : null
      );
      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.map((todo) =>
        true ? { ...todo, completed: false } : null
      );
      setTodos(updatedTodos);
    }

    setCheckAll(!checkAll);
  };

  return (
    <div>
      <h1 data-testid="todo-header">Todo App</h1>
      <input type="checkbox" checked={checkAll} onChange={toggleAll} />

      <input
        type="text"
        data-testid="todo-input"
        onChange={(e) => setTextInput(e.target.value)}
        value={textInput}
      />
      <button data-testid="todo-add-button" onClick={addTodo}>
        Add Todo
      </button>
      {renderListItems}

      {/* count and filters */}
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-evenly",
          gap: "20px",
        }}
      >
        <p style={{ fontSize: ".8rem", margin: 0 }}>{count} item left!</p>
        <span>
          <button onClick={() => setAction("all")} disabled={action === "all"}>
            All
          </button>
          <button
            onClick={() => setAction("active")}
            disabled={action === "active"}
          >
            Active
          </button>
          <button
            onClick={() => setAction("completed")}
            disabled={action === "completed"}
          >
            Completed
          </button>
        </span>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
};

export default TodoApp;
