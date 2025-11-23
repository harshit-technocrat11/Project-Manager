import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// import { AuthContext } from "@/context/AuthContext";
// import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  // const {isAuthenticated} = useContext(AuthContext)


  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
