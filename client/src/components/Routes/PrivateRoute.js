import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

function PrivateRoute() {
    const [authorized, setAuthorized] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
                );
                if (data.success) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (error) {
                console.log("auth check error: ", error);
            }
        };
        if (auth && auth.token) {
            authCheck();
        }
    }, [auth]);

    return authorized ? <Outlet/> : <Spinner/>
}

export default PrivateRoute;
