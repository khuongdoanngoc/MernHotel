import Layout from "../../components/Layout/Layout";
import "./styles.css";
import UserDashboardMenu from "../../components/Layout/UserDashboardMenu";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../../context/auth";

function Dashboard() {
    const [auth] = useAuth();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        setName(auth.user.name);
        setAddress(auth.user.address);
        setPhone(auth.user.phone);
    }, [auth]);

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <UserDashboardMenu />
                <div className="user-dashboard-content">
                    <h2 className="dashboard-title">Account Details</h2>
                    <hr />
                    <div className="dashboard-user-info">
                        <span style={{ alignItems: "center" }}>
                            {auth.user.email}
                        </span>
                        <div className="custom-rectangle">
                            <span>
                                {auth.user.role === 1 ? "Admin" : "Member"}
                            </span>
                        </div>
                    </div>
                    <form>
                        <div className="change-info-inputs">
                            <div className="login-email-address">
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control
                                    placeholder="Please enter your name"
                                    aria-label="name"
                                    aria-describedby="basic-addon1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="login-email-address">
                                <Form.Label htmlFor="phone">Phone</Form.Label>
                                <Form.Control
                                    placeholder="Please enter your phone"
                                    aria-label="phone"
                                    aria-describedby="basic-addon1"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="login-email-address">
                                <Form.Label htmlFor="email">Address</Form.Label>
                                <Form.Control
                                    placeholder="Please enter your address"
                                    aria-label="address"
                                    aria-describedby="basic-addon1"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <hr />
                        <button className="login-submit-button" type="submit">
                            <span>Save</span>
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
