import { useAuth } from "../context/AuthContext";
import { CredentialResponse } from "@react-oauth/google";
import { Button, Container, Typography } from "@mui/material";
import GoogleLoginButton from "./GoogleLoginButton";
import { Navigate } from "react-router-dom";

function Home() {
  const { isAuthenticated, login, logout } = useAuth();
  const handleLoginSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      login(response.credential);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      {!isAuthenticated ? (
        <GoogleLoginButton
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      ) : (
        <div>
          <Button variant="contained" color="secondary" onClick={logout}>
            Logout
          </Button>
          <Navigate to="/todos" replace />
        </div>
      )}
    </Container>
  );
}

export default Home;
