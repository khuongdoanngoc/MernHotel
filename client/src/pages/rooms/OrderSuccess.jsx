import "./styles.css";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function OrderSuccess() {

    const location = useLocation();
    const [id, setId] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const checkExist = async (idFromUrl) => {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/${idFromUrl}`);
            if (!data.success) {
                toast.error('phai dat phong moi co order duoc')
                navigate('/room')
            }
            console.log(data)
        }
        try {
            const idFromUrl = location.pathname.split('/')[3]
            setId(idFromUrl)
            checkExist(idFromUrl)
        } catch (error) {
            console.log(error)
            throw new error()
        }
    }, [])

    return (
        <Layout>
            <div className="order-success-info">
                <h3>Thank you for your order</h3>
                <span>Order #{id} is complete.</span>
                <span>A confirmation email will be sent to you shortly.</span>
            </div>
            <div className="order-success-actions">
                <button className="submit-button order-action">
                    <span>Manage Orders</span>
                </button>
                <button className="submit-button order-action">
                    <span>Continue Shopping</span>
                </button>
            </div>
        </Layout>
    );
}

export default OrderSuccess;
