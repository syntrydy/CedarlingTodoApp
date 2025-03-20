import {
  Button,
  Checkbox,
  Container,
  Divider,
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
import ProtectedView from "./cedarling/ProtectedView";
import {
  ACTION_ADD,
  ACTION_DELETE,
  ACTION_MARK_COMPLETE,
  ACTION_UPDATE,
  ACTION_USE,
  ACTION_VIEW_DETAILS,
  initialTodoList,
} from "./cedarling/Constants";

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
  const [todoList, setTodoList] = useState(initialTodoList);

  return (
    <Container
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        width: "80%",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ marginBottom: "20px" }}>
        Welcome to Cedarling Todo App
      </Typography>
      <ProtectedView actionId={ACTION_ADD} resourceId="add-task">
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
                        author:
                          user?.userInfo?.email || "anonymous@cedarling.com",
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
      </ProtectedView>
      <ProtectedView
        actionId={ACTION_USE}
        resourceId="view-todo-list"
        isDashboard={true}
        context={{
          currentHour: new Date().getHours(),
        }}
      >
        <Paper style={{ padding: "20px" }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "10px" }}
          >
            List of things to do this week
          </Typography>
          <Divider />
          {todoList.map((todo) => (
            <Grid
              container
              spacing={2}
              key={todo.id}
              style={{ marginTop: "10px" }}
            >
              <ProtectedView
                actionId={ACTION_MARK_COMPLETE}
                resourceId="complete-task"
                todoItem={todo}
              >
                <Grid xs={1} md={1}>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => {
                      setTodoList(
                        todoList.map((t) =>
                          t.id === todo.id
                            ? { ...t, completed: !t.completed }
                            : t
                        )
                      );
                    }}
                  />
                </Grid>
              </ProtectedView>
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
              <ProtectedView
                actionId={ACTION_UPDATE}
                resourceId="edit-task"
                todoItem={todo}
              >
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
              </ProtectedView>
              <ProtectedView
                actionId={ACTION_VIEW_DETAILS}
                resourceId="view-details"
                todoItem={todo}
              >
                <Grid xs={1} md={1}>
                  <ViewIcon
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      setSelectedTodo(todo);
                      setOpenDetailDialog(true);
                    }}
                  />
                </Grid>
              </ProtectedView>
              <ProtectedView
                actionId={ACTION_DELETE}
                resourceId="delete-task"
                todoItem={todo}
              >
                <Grid xs={1} md={1}>
                  <DeleteIcon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setTodoList(todoList.filter((t) => t.id !== todo.id));
                    }}
                  />
                </Grid>
              </ProtectedView>
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
      </ProtectedView>
    </Container>
  );
}

export default TodoDashboard;
