import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

function AdminRoute() {
    const [authorized, setAuthorized] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const adminCheck = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
                );
                if (data.success) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (error) {
                console.log("Admin check error: ", error);
            }
        };
        if (auth.token && auth) {
            adminCheck();
        }
    }, [auth.token]);

    return authorized ? <Outlet /> : <Spinner />;
}

export default AdminRoute;
