import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const adminCheck = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        },
                    }
                );
                setTimeout(() => {
                    console.log('hehe')
                }, (3000))
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.log("Admin check error: ", error);
            } finally {
                setLoading(false);
            }
        };
        if (auth.token && auth) {
            adminCheck();
        }
    }, [auth.token]);

    if (loading) {
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

export default AdminRoute;
