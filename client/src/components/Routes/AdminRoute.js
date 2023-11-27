import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const adminCheck = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API}/auth/admin-auth`,
                    {
                        headers: `Bearer ${auth.token}`,
                    }
                );
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.log('Admin check error: ', error)
            }
            if (auth.token && auth) {
                adminCheck()
            }
        };
    }, [auth.token]);
}

export default AdminRoute;
