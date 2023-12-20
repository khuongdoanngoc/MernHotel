import Layout from "../../components/Layout/Layout";
import "../user/styles.css";
import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";
import { useAuth } from "../../context/auth";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        setName(auth.user.name);
        setAddress(auth.user.address);
        setPhone(auth.user.phone);
    }, [auth]);

    const handleUpdateAuth = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.warning("Name is Required!");
            return;
        }
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/update`,
                {
                    name,
                    address,
                    phone,
                }
            );
            if (data.success) {
                toast.success(data.message);
                // set token
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token,
                });
                delete data.user["password"];
                const authToken = {
                    token: data.token,
                    user: data.user,
                };
                localStorage.setItem("auth", JSON.stringify(authToken));
                if (data.user.role === 1) {
                    navigate('/admin/dashboard')
                } else {
                    navigate('/user/dashboard')
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Update!");
            }
        }
    };

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
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
                        <button
                            className="login-submit-button"
                            type="submit"
                            onClick={handleUpdateAuth}>
                            <span>Save</span>
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
