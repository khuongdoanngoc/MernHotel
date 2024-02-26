import "./login.css";
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registerURL = `${process.env.REACT_APP_API}/api/v1/auth/register`;
            const data = {
                username,
                name,
                email,
                password,
                phone,
                address,
            };
            if (confirmPassword !== data.password) {
                return toast.error(
                    "Password and confirm password do not match!"
                );
            }
            const res = await axios.post(registerURL, data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.response.data);
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Registation!");
            }
        }
    };

    const handleServiceLogin = async (service) => {
        window.location.href = `${process.env.REACT_APP_API}/api/v1/auth/${service}`;
    };

    return (
        <Layout>
            <div className="login">
                <h2 className="login-title">Sign Up</h2>
                <hr />
                <form>
                    <div className="login-row">
                        <div className="login-normally">
                            <div className="">
                                <Form.Label htmlFor="email">
                                    Username
                                </Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your username"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your name"
                                    aria-label="name"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <Form.Label htmlFor="email">
                                    Email Address
                                </Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your email"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="">
                                <Form.Label htmlFor="phone">Phone</Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your phone"
                                    aria-label="phone"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <Form.Label htmlFor="email">Address</Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your address"
                                    aria-label="address"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="login-password">
                                <Form.Label htmlFor="password">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your password"
                                    aria-label="password"
                                    aria-describedby="basic-addon1"
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="login-password">
                                <Form.Label htmlFor="confirm-password">
                                    Confirm Password
                                </Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your password"
                                    aria-label="password"
                                    aria-describedby="basic-addon1"
                                    type="password"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="login-third-party">
                            <a
                                className="login-social"
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleServiceLogin("google");
                                }}>
                                <button type="button">
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
                            <a
                                className="login-social"
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}>
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
                            onClick={handleSubmit}>
                            <span>Sign Up</span>
                        </button>
                        <a className="login-submit-register" href="/login">
                            Already Have An Account?
                        </a>
                        <a
                            className="login-forgot-password"
                            href="/forgot-password">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
