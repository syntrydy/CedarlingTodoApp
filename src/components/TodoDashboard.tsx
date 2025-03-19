import {
  Button,
  Checkbox,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TodoDetailDialog from "./TodoDetailDialog";

interface Todo {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  completed: boolean;
}
function TodoDashboard() {
  const { user } = useAuth();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const initialTodoList = [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "Mougang T. Gasmyr",
      title: "import cedarling wasm",
      completed: true,
    },
  ];
  const [todoList, setTodoList] = useState(initialTodoList);

  

  return (
    <Container
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ marginBottom: "20px" }}>
        Welcome to Cedarling Todo App
      </Typography>
      <Paper style={{ padding: "20px", marginBottom: "10px" }}>
        <Grid container spacing={2}>
          <Grid xs={9} md={9}>
            <TextField
              size="small"
              label="Add a new task"
              fullWidth
              margin="normal"
              id="task-input"
            />
          </Grid>
          <Grid xs={3} md={3}>
            <Button
              startIcon={<AddIcon />}
              size="small"
              onClick={() => {
                const taskInput = document.getElementById(
                  "task-input"
                ) as HTMLInputElement;
                if (taskInput.value.trim() === "") {
                  alert("Please enter a task");
                  return;
                } else if (editingTodo) {
                  setTodoList(
                    todoList.map((todo) =>
                      todo.id === editingTodo.id
                        ? {
                            ...todo,
                            title: taskInput.value,
                            updatedAt: new Date(),
                          }
                        : todo
                    )
                  );
                  setEditingTodo(null);
                } else {
                  setTodoList([
                    ...todoList,
                    {
                      id: crypto.randomUUID(),
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      author: user?.userInfo?.name || "Anonymous",
                      title: taskInput.value,
                      completed: false,
                    },
                  ]);
                }
                taskInput.value = "";
              }}
              style={{ marginTop: "20px", marginLeft: "10px" }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: "20px" }}>
        {todoList.map((todo) => (
          <Grid
            container
            spacing={2}
            key={todo.id}
            style={{ marginTop: "10px" }}
          >
            <Grid xs={1} md={1}>
              <Checkbox checked={todo.completed} onChange={() => {}} />
            </Grid>
            <Grid xs={8} md={8}>
              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  textAlign: "left",
                  marginTop: "5px",
                }}
              >
                {todo.title}
              </Typography>
            </Grid>
            <Grid xs={1} md={1}>
              <EditIcon
                style={{ cursor: "pointer", color: "green" }}
                onClick={() => {
                  setEditingTodo(todo);
                  const taskInput = document.getElementById(
                    "task-input"
                  ) as HTMLInputElement;
                  taskInput.value = todo.title;
                  taskInput.focus();
                }}
              />
            </Grid>
            <Grid xs={1} md={1}>
              <ViewIcon
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => {
                  setSelectedTodo(todo);
                  setOpenDetailDialog(true);
                }}
              />
            </Grid>
            <Grid xs={1} md={1}>
              <DeleteIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => {
                  setTodoList(todoList.filter((t) => t.id !== todo.id));
                }}
              />
            </Grid>
          </Grid>
        ))}
        {selectedTodo && (
          <TodoDetailDialog
            open={openDetailDialog}
            onClose={() => setOpenDetailDialog(false)}
            todo={selectedTodo as Todo}
          />
        )}
      </Paper>
    </Container>
  );
}

export default TodoDashboard;
