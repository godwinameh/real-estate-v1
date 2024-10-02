import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebaseConfig";
import useAuthStatus from "../hooks/useAuthStatus";

export default function PrivateRoute() {
    // let loggedIn = auth.currentUser !== null;
    const { loggedIn, checkStatus } = useAuthStatus();
    if (checkStatus) return <h1>Loading...</h1>;
    return <div>{loggedIn ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
}
