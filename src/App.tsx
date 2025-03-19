import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import "./App.css";
import Home from "./components/Home";
import TodoDashboard from "./components/TodoDashboard";
import { useEffect } from "react";
import { cedarlingClient } from "./cedarling/CedarlingClient";
import bootstrap from "./cedarling/bootstrap.json";
function App() {
  useEffect(() => {
    if (
      import.meta.env.VITE_APP_ENFORCE_WITH_CEDARLING &&
      import.meta.env.VITE_APP_ENFORCE_WITH_CEDARLING === "true"
    ) {
      cedarlingClient.initialize(bootstrap).catch(console.error);
    }
  }, []);

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
