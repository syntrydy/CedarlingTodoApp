import React from "react";
import { GoogleLogin } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  onSuccess: (response: any) => void;
  onError: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
}) => {
  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};

export default GoogleLoginButton;
