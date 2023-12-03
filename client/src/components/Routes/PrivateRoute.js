import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                console.log(auth)
                const res = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );
                console.log('res data: ', res.data)
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.log("auth check error: ", error);
            } finally {
                setLoading(false);
            }
        };
        if (auth && auth.token) {
            authCheck();
        }
    }, [auth.token]);

    if (loading) {
        console.log('loading...')
        return <Spinner />;
    } else {
        if (ok) {
            return <Outlet />;
        } else {
            const isAuthorized = "no";
            navigate(`/?isAuthorized=` + encodeURIComponent(isAuthorized));
            return null;
        }
    }
}

export default PrivateRoute;
