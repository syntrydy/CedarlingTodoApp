import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import "./App.css";
import Home from "./components/Home";
import TodoDashboard from "./components/TodoDashboard";

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoDashboard />} />
            <Route path="/logout" />
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
