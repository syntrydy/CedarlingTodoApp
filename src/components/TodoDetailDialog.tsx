import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

interface Todo {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  completed: boolean;
}

function TodoDetailDialog({
  open,
  onClose,
  todo,
}: {
  open: boolean;
  onClose: () => void;
  todo: Todo;
}) {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          maxHeight: "80vh",
          overflow: "auto",
        },
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Task Details</DialogTitle>
      <DialogContent dividers style={{ padding: "10px" }}>
        <Grid container spacing={2} style={{ margin: "10px" }}>
          <Grid xs={6} md={6}>
            Task Title: <span style={{ fontWeight: "bold" }}>{todo.title}</span>
          </Grid>
          <Grid xs={6} md={6}>
            Status:{" "}
            <span style={{ fontWeight: "bold" }}>
              {todo.completed ? "Completed" : "In Progress"}
            </span>
          </Grid>
          <Grid xs={6} md={6}>
            Creation date:{" "}
            <span style={{ fontWeight: "bold" }}>
              {todo.createdAt.toLocaleString()}
            </span>
          </Grid>
          <Grid xs={6} md={6}>
            Last update:{" "}
            <span style={{ fontWeight: "bold" }}>
              {todo.updatedAt.toLocaleString()}
            </span>
          </Grid>
          <Grid xs={12} md={12}>
            Author: <span style={{ fontWeight: "bold" }}>{todo.author}</span>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={onClose}
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodoDetailDialog;
