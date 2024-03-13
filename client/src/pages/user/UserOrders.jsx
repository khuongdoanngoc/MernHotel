import Layout from "../../components/Layout/Layout";
import "./styles.css";
import UserDashboardMenu from "../../components/Layout/UserDashboardMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/FormatDate";

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    useEffect(() => {
        const getOrders = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/order/get-orders-by-userid/${auth.user._id}`
            );
            if (data.success && data.orders) {
                setOrders(data.orders);
            } else {
                toast.error("Error get orders");
            }
        };
        try {
            getOrders();
        } catch (error) {
            throw new error();
        }
    }, []);



    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <UserDashboardMenu />
                <div className="user-dashboard-content">
                    <h1 className="dashboard-title">UserOrders</h1>
                    <hr />
                    <div className="category-cards">
                        {orders.map((order) => (
                            <a key={order._id} href={"order/" + order._id}>
                                <Card>
                                    <Card.Body>
                                        <ul style={{ marginBottom: '0px'}}>
                                            <li>
                                                <strong>Order Id:</strong>{" "}
                                                {order._id}
                                            </li>
                                            <li>
                                                <strong>Check-in Date:</strong>{" "}
                                                {formatDate(order.checkin)}
                                            </li>
                                            <li>
                                                <strong>Check-out Date:</strong>{" "}
                                                {formatDate(order.checkout)}
                                            </li>
                                            <li style={{ color: "red" }}>
                                                <strong>Total Price:</strong> $
                                                {order.total}
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserOrders;
