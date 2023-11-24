import "../../styles/authStyles/login.css";
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();



    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginURL = `${process.env.REACT_APP_API}/api/v1/auth/login`;
            const data = {
                email,
                password,
            };
            const res = await axios.post(loginURL, data);
            if (res.data.success) {
                toast.success(res.data.message);
                // set token
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Registation!");
            }
        }
    };

    return (
        <Layout>
            <div className="login">
                <h2 className="login-title">Login</h2>
                <hr />
                <form>
                    <div className="login-row">
                        <div className="login-normally">
                            <div className="login-email-address">
                                <Form.Label htmlFor="email">
                                    Email Address
                                </Form.Label>
                                <Form.Control
                                    placeholder="Please enter your email"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="login-password">
                                <Form.Label htmlFor="password">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    placeholder="Please enter your password"
                                    aria-label="password"
                                    aria-describedby="basic-addon1"
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="login-third-party">
                            <a className="login-social" href="#oauth2-google">
                                <button>
                                    <i
                                        className="bi bi-google"
                                        style={{ fontSize: "30px" }}></i>
                                    <span
                                        style={{
                                            fontSize: "20px",
                                            fontFamily: "Poppins",
                                        }}>
                                        Login with Google
                                    </span>
                                </button>
                            </a>
                            <a className="login-social" href="#oath2-facebook">
                                <button>
                                    <i
                                        className="bi bi-facebook"
                                        style={{ fontSize: "30px" }}></i>
                                    <span
                                        style={{
                                            fontSize: "20px",
                                            fontFamily: "Poppins",
                                        }}>
                                        Login with Facebook
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <hr />
                    <div className="login-submit">
                        <button
                            className="login-submit-button"
                            type="submit"
                            onClick={handleLoginSubmit}
                            >
                            <span>Login</span>
                        </button>
                        <a className="login-submit-register" href="/register">
                            Create An Account
                        </a>
                        <a
                            className="login-forgot-password"
                            href="/auth/password-retrieval">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
