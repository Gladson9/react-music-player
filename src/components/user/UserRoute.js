import { Route, Redirect } from "react-router";
import { useAuth } from "../context/AuthContext";
const AdminRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AdminRoute;
