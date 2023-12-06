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
          "https://ec540c3d-52b5-4f95-8be2-e30f22cbdbc7.e1-us-east-azure.choreoapps.dev",
        signOutRedirectURL:
          "https://ec540c3d-52b5-4f95-8be2-e30f22cbdbc7.e1-us-east-azure.choreoapps.dev",
        clientID: "ufGfDEvOxuCRhDPL15fk1KFQHBQa",
        baseUrl: "https://api.asgardeo.io/t/thivaorg",
        scope: ["openid", "profile"],
      }}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
