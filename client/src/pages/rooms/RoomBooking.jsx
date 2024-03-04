import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function RoomBooking() {
    const location = useLocation();
    const [room, setRoom] = useState({});

    useEffect(() => {
        const getRoom = async (_id) => {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/get-product-by-id`,
                {
                    _id: _id,
                }
            );
            setRoom(data.product);
        };
        try {
            const _idFromPathName =
                location.pathname.split("/")[
                    location.pathname.split("/").length - 1
                ];

            getRoom(_idFromPathName);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Layout>
            <div className="room-info">
                <div className="room-img">
                    <img
                        src="https://blz04pap003files.storage.live.com/y4moM-sLwjeOmGp3UaA6hu_8thvi4Zrp603qJQb5lhATZHZdwjuO_ZlCrpZD7l9738lB3qTV0td0IxjfIkvS3p9bIfZ9ufbTY5fz9O2xKjKXqV3cvPcb1y41qqSDWs3CkltiuBppEU66IRLXBbAuGvalboiXjleMOKM6ptq0CjyS0xxcF42Ly4ZxgqM_b7a93t7X5kV2QFwTtpsrXjnAHFgZm7V81f9gYTc5fpiHpeALrU?encodeFailures=1&width=1024&height=1024"
                        alt=""
                        style={{ width: "447.59px" }}
                    />
                </div>
                <div className="room-description">
                    <div className="item-detail">
                        <h3>{room.name}</h3>
                        <hr />
                        <p>{room.description}</p>
                        <h4>${room.price}</h4>
                    </div>
                    <div className="item-time">
                        
                    </div>
                    <div className="item-share"></div>
                    <div className="item-actions"></div>
                </div>
            </div>
        </Layout>
    );
}

export default RoomBooking;
