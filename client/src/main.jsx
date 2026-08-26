import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "927678819292-6efkpn7n4md10stvdm03gmkgfuh4cv76.apps.googleusercontent.com";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <AuthProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);