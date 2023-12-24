import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [code, setCode] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [count, setCount] = useState(120);
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();

    const handleSendMail = async (e) => {
        e.preventDefault();
        if (!email || "") {
            toast.warning("Please enter your email!");
            return;
        }
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/reset-password`,
                {
                    email,
                }
            );
            console.log("data: ", data);
            if (data.success) {
                toast.success(data.message);
                toast.success("Please check your email to get the code!");
                setIsSent(true);
                setEmail("");
                setUserId(data.info._id);
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
            setEmail("");
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
                            <div className="login-email-address">
                                <Form.Label htmlFor="email">
                                    {isSent ? "Code" : "Email Address"}
                                </Form.Label>
                                <Form.Control
                                    placeholder={`Please enter ${
                                        isSent ? "code" : "your email"
                                    }`}
                                    aria-label={`${isSent ? "code" : "email"}`}
                                    aria-describedby="basic-addon1"
                                    value={isSent ? code : email}
                                    required
                                    onChange={(e) => {
                                        if (isSent) {
                                            setCode(e.target.value);
                                        } else {
                                            setEmail(e.target.value);
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
                            className="login-submit-button"
                            type="submit"
                            onClick={isSent ? handleSendCode : handleSendMail}>
                            <span>{isSent ? "Verify" : "Send Mail"}</span>
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
