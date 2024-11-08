import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = params.get("email_verify_token");
    if (token) {
      console.log("Token found:", token);
      localStorage.setItem("email_verify_token", token);
      console.log("Navigating to /profile");
      navigate("/Login");
    } else {
      console.log("No token found.");
    }
  }, [params, navigate]);

  return null; // Ensure the component returns something
}
