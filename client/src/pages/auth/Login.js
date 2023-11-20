import "../../styles/authStyles/login.css";
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";

function Login() {
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
                                />
                            </div>
                        </div>
                        <div className="login-third-party">
                            <a className="login-social" href="#oauth2-google">
                                <button>
                                    <i
                                        className="bi bi-google"
                                        style={{ fontSize: "30px" }}></i>
                                    <span style={{ fontSize: "20px" }}>
                                        Login with Google
                                    </span>
                                </button>
                            </a>
                            <a className="login-social" href="#oath2-facebook">
                                <button>
                                    <i
                                        className="bi bi-facebook"
                                        style={{ fontSize: "30px" }}></i>
                                    <span style={{ fontSize: "20px" }}>
                                        Login with Facebook
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <hr />
                    <div className="login-submit">
                        <button className="login-submit-button" type="submit">
                            <span>Login</span>
                        </button>
                        <a className="login-submit-register" href="/register">
                            Create An Account
                        </a>
                        <a className="login-forgot-password" href="/auth/password-retrieval">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
