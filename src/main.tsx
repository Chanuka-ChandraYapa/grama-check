import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider
      config={{
        // signInRedirectURL: "http://localhost:3000",
        // signOutRedirectURL: "http://localhost:3000",
        signInRedirectURL:
          "http://localhost:3000",
        signOutRedirectURL:
          "http://localhost:3000",
        clientID: "ufGfDEvOxuCRhDPL15fk1KFQHBQa",
        baseUrl: "https://api.asgardeo.io/t/thivaorg",
        scope: ["openid", "profile"],
      }}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
