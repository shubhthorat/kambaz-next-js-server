let todos = [
  { id: 1, title: "Task 1", completed: false, description: "" },
  { id: 2, title: "Task 2", completed: true, description: "" },
  { id: 3, title: "Task 3", completed: false, description: "" },
  { id: 4, title: "Task 4", completed: true, description: "" },
];

export default function WorkingWithArrays(app) {
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };

  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id, 10));
    if (!todo) {
      res.status(404).json({ message: `Todo ${id} not found` });
      return;
    }
    res.json(todo);
  };

  const createNewTodo = (req, res) => {
    const newTodo = {
      id: Date.now(),
      title: "New Task",
      completed: false,
      description: "",
    };
    todos.push(newTodo);
    res.json(todos);
  };

  const postNewTodo = (req, res) => {
    const newTodo = {
      ...req.body,
      id: Date.now(),
      description: req.body.description ?? "",
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id, 10));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.json(todos);
  };

  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id, 10));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id, 10));
    if (!todo) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todo.title = decodeURIComponent(title);
    res.json(todos);
  };

  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id, 10));
    if (!todo) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todo.completed = completed === "true";
    res.json(todos);
  };

  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id, 10));
    if (!todo) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todo.description = decodeURIComponent(description);
    res.json(todos);
  };

  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id, 10));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) =>
      t.id === parseInt(id, 10) ? { ...t, ...req.body } : t
    );
    res.sendStatus(200);
  };

  app.get("/lab5/todos/create", createNewTodo);
  app.post("/lab5/todos", postNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.put("/lab5/todos/:id", updateTodo);
  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos", getTodos);
}
