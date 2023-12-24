import Layout from "../../components/Layout/Layout";
import "../user/styles.css";
import "./styles.css";
import UserDashboardMenu from "../../components/Layout/UserDashboardMenu";
import { useAuth } from "../../context/auth";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AccountSecurity() {

    const [auth] = useAuth();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [permission, setPermission] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        // validate data
        {
            if (!permission && !oldPassword) {
                toast.error("Old Password is Required!");
                return;
            }
            if (!newPassword) {
                toast.error("New Password is Required!");
                return;
            }
            if (!confirmNewPassword) {
                toast.error("Confirm New Password is Required!");
                return;
            }
            if (newPassword !== confirmNewPassword) {
                toast.error("password & password confirm not match!");
                return;
            }
        }
        try {
            const passwordData = permission ? { permission, newPassword } : { oldPassword, newPassword }
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/change-password`,
                passwordData
            );
            if (data.success) {
                toast.success(data.message);
                localStorage.clear();
                navigate("/login");
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
                if (message === 'Code Is Not Matched!') {
                    localStorage.clear()
                    navigate('/login')
                } else if (message === 'Old Password is Incorrect!') {
                    setOldPassword("")
                    setNewPassword("")
                    setConfirmNewPassword("")
                }
            } else {
                toast.error("Failure Change Password!");
            }
        }
    };

    useEffect(() => {
        console.log(permission)
        const permissionCode = location.search.split("=")[1];
        if (permissionCode) {
            setPermission(permissionCode)
        }
    }, [location]);

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <UserDashboardMenu/>
                <div className="user-dashboard-content">
                    <h2 className="dashboard-title">Account Security</h2>
                    <hr />
                    <div className="dashboard-user-info">
                        <span className="security-function">
                            Reset Password
                        </span>
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
                            {!permission && (
                                <div className="login-email-address">
                                    <Form.Label htmlFor="name">
                                        Old Password
                                    </Form.Label>
                                    <Form.Control
                                        placeholder="Please enter your old password"
                                        aria-label="name"
                                        aria-describedby="basic-addon1"
                                        required
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                    />
                                </div>
                            )}
                            <div className="login-email-address">
                                <Form.Label htmlFor="phone">
                                    New Password
                                </Form.Label>
                                <Form.Control
                                    placeholder="Please enter your new password"
                                    aria-label="phone"
                                    aria-describedby="basic-addon1"
                                    required
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="login-email-address">
                                <Form.Label htmlFor="email">
                                    Confirmed New Passsword
                                </Form.Label>
                                <Form.Control
                                    placeholder="Please enter your new password"
                                    aria-label="address"
                                    aria-describedby="basic-addon1"
                                    required
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) =>
                                        setConfirmNewPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <hr />
                        <button
                            className="login-submit-button"
                            type="submit"
                            onClick={handleResetPassword}>
                            <span>Save</span>
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default AccountSecurity;
