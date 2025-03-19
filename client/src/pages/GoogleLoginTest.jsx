import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginTest = () => {
  const login = useGoogleLogin({
    onSuccess: (res) => console.log("Success:", res),
    onError: (err) => console.log("Error:", err),
  });

  return (
    <button
      onClick={() => {
        console.log("Button clicked");
        login();
      }}
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginTest;
