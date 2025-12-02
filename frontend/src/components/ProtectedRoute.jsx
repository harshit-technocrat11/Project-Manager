import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// import { AuthContext } from "@/context/AuthContext";
// import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  // const {isAuthenticated} = useContext(AuthContext)

  // const { isAuthenticated } = useAuth();
  const { user, loading } = useAuth();
 

  if ( loading ) return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h4>Loading...🔃</h4>
    </div>
  );

  //redirecting if the user is null ( logged out ) 
  if (!user ) {
    return <Navigate to="/login" />
  }

  // rendering children == protected routes , if user is Logeed IN
  return children;
}
