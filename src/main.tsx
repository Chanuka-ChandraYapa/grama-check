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
          "https://5399b3e1-b549-4093-92cc-4e20805a9383.e1-us-east-azure.choreoapps.dev",
        signOutRedirectURL:
          "https://5399b3e1-b549-4093-92cc-4e20805a9383.e1-us-east-azure.choreoapps.dev",
        clientID: "ufGfDEvOxuCRhDPL15fk1KFQHBQa",
        baseUrl: "https://api.asgardeo.io/t/thivaorg",
        scope: ["openid", "profile"],
      }}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
