import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import axios from "axios";

function LoginSuccess() {
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const token = urlSearchParams.get("token");
        const getUser = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/auth/secret/get-user`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!res.data.success) {
                    toast.error("No Auth Token");
                    navigate('/')
                }
                const user = res.data.user
                const authStored = {
                    token,
                    user,
                };
                localStorage.setItem("auth", JSON.stringify(authStored));
                setAuth({
                    ...auth,
                    user,
                    token,
                });
                toast.success('Login Successfully!');
                navigate("/");
            } catch (error) {
                console.log("error get user: ", error);
            }
        };
        getUser()
    }, [location.search]);
}

export default LoginSuccess;
