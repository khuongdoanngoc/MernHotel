import { Button } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/FormatDate";
import { toast } from "react-toastify";
import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";

function OrderDetails() {
    const [info, setInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        const _id =
            location.pathname.split("/")[
                location.pathname.split("/").length - 1
            ];
        const getOrder = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/order/${_id}`
            );
            setInfo({
                order: data.order,
                product: data.product,
                user: data.user,
            });
        };
        try {
            getOrder();
        } catch (error) {}
    }, []);

    const handleCancelOrder = (e) => {
        e.preventDefault();
        const _id =
            location.pathname.split("/")[
                location.pathname.split("/").length - 1
            ];
        const doCancel = async () => {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/order/cancel/${_id}`
            );
            console.log(data);
            if (data.success) {
                toast.success("cancel the order success!");
                navigate('/admin/dashboard/order')
            } else {
                toast.error(data.message)
            }
        };
        try {
            doCancel();
        } catch (error) {
            toast.error("server error");
            throw new error();
        }
    };

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <div className="df space-between">
                        <h2 className="dashboard-title">Order Details</h2>
                        <Button
                            className="add-category-button"
                            variant="secondary"
                            onClick={() =>
                                (window.location.pathname =
                                    "/admin/dashboard/order")
                            }>
                            Back
                        </Button>{" "}
                    </div>
                    <hr />
                    {info.order && (
                        <ul style={{ marginBottom: "0px" }}>
                            <li>
                                <strong>Order Id:</strong> {info.order._id}
                            </li>
                            <li>Customer Name: {info.user.name}</li>
                            <li>
                                <strong>Room:</strong> {info.product.name}
                            </li>
                            <li>
                                <strong>Check-in Date:</strong>{" "}
                                {formatDate(info.order.checkin)}
                            </li>
                            <li>
                                <strong>Check-out Date:</strong>{" "}
                                {formatDate(info.order.checkout)}
                            </li>
                            <li style={{ color: "red" }}>
                                <strong>Total Price:</strong> $
                                {info.order.total}
                            </li>
                        </ul>
                    )}
                    <div className="category-form">
                        <hr />
                        <div className="d-flex">
                            <button
                                className="submit-button"
                                type="submit"
                                onClick={handleCancelOrder}>
                                <span>Cancel Order</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default OrderDetails;
