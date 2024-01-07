import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

function ForgotPassword() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [code, setCode] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [count, setCount] = useState(120);
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();

    const handleSendMail = async (e) => {
        e.preventDefault();
        if (!username || "") {
            toast.warning("Please enter your username!");
            return;
        }
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/reset-password`,
                {
                    username,
                }
            );
            if (data.success) {
                toast.success(data.message);
                toast.success("Please check your email to get the code!");
                setIsSent(true);
                setUsername("");
                setUserId(data.info._id);
                setEmail(data.info.email)
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Reset Password!");
            }
        }
    };

    const handleSendCode = async (e) => {
        e.preventDefault();
        if (!code || "") {
            toast.warning("Please enter code");
            return;
        }
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/verify-code`,
                {
                    code,
                    _id: userId,
                }
            );
            if (data.success) {
                toast.success(data.message);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token,
                });
                const authToken = {
                    token: data.token,
                    user: data.user
                }
                localStorage.setItem("auth", JSON.stringify(authToken));
                navigate(`/user/dashboard/security?permissionCode=${data.resetCode}`);
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Reset Password!");
            }
        }
    };

    useEffect(() => {
        if (isSent) {
            const interval = setInterval(() => {
                setCount((prevCount) => --prevCount);
            }, 1000);
            if (count === 0) {
                toast.error("Code is Expired!");
                navigate("/login");
            }
            return () => clearInterval(interval);
        }
    }, [isSent, count, navigate]);
    useEffect(() => {
        if (isSent) {
            setCode("");
            setUsername("");
        }
    }, [isSent]);

    return (
        <Layout>
            <div className="login">
                <h2 className="login-title">Forgot Password</h2>
                <hr />
                <form>
                    <div className="login-row">
                        <div className="login-normally">
                            <div className="">
                                <Form.Label htmlFor="email">
                                    {isSent ? `Code from ${email}` : "Username"}
                                </Form.Label>
                                <Form.Control
                                    placeholder={`Please enter ${
                                        isSent ? "code" : "your username"
                                    }`}
                                    aria-label={`${isSent ? "code" : "username"}`}
                                    aria-describedby="basic-addon1"
                                    value={isSent ? code : username}
                                    required
                                    onChange={(e) => {
                                        if (isSent) {
                                            setCode(e.target.value);
                                        } else {
                                            setUsername(e.target.value);
                                        }
                                    }}
                                />
                                {isSent && (
                                    <div className="expired-coutdown">
                                        <span>Expired In: {count}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="login-submit">
                        <button
                            className="submit-button"
                            type="submit"
                            onClick={isSent ? handleSendCode : handleSendMail}>
                            <span>{isSent ? "Verify" : "Retrieve"}</span>
                        </button>
                        <a className="login-forgot-password" href="/login">
                            Back To Login?
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
