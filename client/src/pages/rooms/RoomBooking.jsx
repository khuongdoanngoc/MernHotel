import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import Rating from "@mui/material/Rating";


function RoomBooking() {
    const location = useLocation();
    const [room, setRoom] = useState({});
    const [checkin, setCheckin] = useState({});
    const [checkout, setCheckout] = useState({});
    const [total, setTotal] = useState(0);

    const handleCheckinChange = (checkinTime) => {
        if (checkout.isBefore(checkinTime)) {
            setCheckout(checkinTime.add(1, "day"));
        }
        setCheckin(checkinTime);
    };

    useEffect(() => {
        setCheckin(dayjs());
        setCheckout(dayjs().add(1, "day"));
    }, []);

    useEffect(() => {
        const diff = dayjs(checkout).diff(dayjs(checkin), "day");
        setTotal(diff * room.pricePerDay);
    }, [checkin, checkout]);

    useEffect(() => {
        const getRoom = async (_id) => {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/get-product-by-id`,
                {
                    _id,
                }
            );
            setRoom(data.product);
            setTotal(data.product.pricePerDay);
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

    const disablePastDates = (date) => {
        return date.isBefore(dayjs(), "day");
    };

    const disablePastCheckins = (date) => {
        return date.isBefore(checkin.add(1, "day"), "day");
    };

    return (
        <Layout>
            <div className="room-info">
                <div className="room-img">
                    <img
                        src={`${room.imgUrl}`}
                        alt=""
                        style={{ width: "447.59px" }}
                    />
                </div>
                <div className="room-description">
                    <div className="item-detail">
                        <h3>{room.name}</h3>
                        <hr />
                        <p>{room.description}</p>
                        <h4>${total}</h4>
                    </div>
                    <div className="item-time">
                        <DatePicker
                            className="item-picker"
                            label={"check in"}
                            value={checkin}
                            onChange={handleCheckinChange}
                            shouldDisableDate={disablePastDates}
                        />
                        <DatePicker
                            className="item-picker"
                            label={"check out"}
                            value={checkout}
                            onChange={(checkoutTime) =>
                                setCheckout(checkoutTime)
                            }
                            shouldDisableDate={disablePastCheckins}
                        />
                    </div>
                    <div className="item-share">
                        <FaFacebook className="share-icons" />
                        <FaInstagram className="share-icons" />
                        <FaPinterest className="share-icons" />
                        <FaTwitter className="share-icons" />
                    </div>
                    <div className="item-actions">
                        <div className="btn-booking-now">
                            <Button
                                variant="outline-primary"
                                id="button-addon2">
                                Book now
                            </Button>
                        </div>
                        <div className="btn-add-to-cart">
                            <Button
                                variant="outline-secondary"
                                id="button-addon2">
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="room-rates">
                <div className="room-rating-result">
                    <h4>Rating</h4>
                    <Rating name="read-only" value={3} readOnly />
                    <hr />
                </div>
                <div className="room-review"></div>
            </div>
        </Layout>
    );
}

export default RoomBooking;
