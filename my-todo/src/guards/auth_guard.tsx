import React from "react";
import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");

    if (!token || !expiry) {
      setIsAuthenticated(false);
      return;
    }

    const expiryTime = parseInt(expiry, 10); // token_expiry in ms
    const currentTime = Date.now();

    if (currentTime >= expiryTime) {
      // Token is expired
      localStorage.clear();
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <span className="text-xl font-semibold text-blue-600">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
