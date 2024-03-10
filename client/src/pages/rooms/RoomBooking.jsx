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
import Form from "react-bootstrap/Form";

import { BarChart } from "@mui/x-charts/BarChart";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

function RoomBooking() {
    const location = useLocation();
    const [room, setRoom] = useState({});
    const [checkin, setCheckin] = useState({});
    const [checkout, setCheckout] = useState({});
    const [total, setTotal] = useState(0);
    const [productId, setProductId] = useState("");

    // auth
    const [auth] = useAuth();

    // review states
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(0);

    const handleCheckinChange = (checkinTime) => {
        if (checkout.isBefore(checkinTime.add(1, "day"))) {
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
            setProductId(_idFromPathName);
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

    const handlePublishReview = (e) => {
        e.preventDefault();
        // validate
        if (!comment) {
            toast.error("comment are required!");
            return;
        }
        console.log(auth)
        const publish = async () => {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/review/create`,
                {
                    comment,
                    rate,
                    authorId: auth.user._id,
                    productId
                }
            );
            if (data.success) {
                toast.success("publish review successful!");
                window.location.reload();
            }
        };
        try {
            publish();
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
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
                    <span>bases</span>
                    <hr style={{ marginBottom: "-5px" }} />
                    <BarChart
                        xAxis={[
                            {
                                scaleType: "band",
                                data: [
                                    "5 stars",
                                    "4 stars",
                                    "3 stars",
                                    "2 stars",
                                    "1 star",
                                ],
                            },
                        ]}
                        series={[{ data: [14, 4, 3, 1, 4] }]}
                        width={400}
                        height={230}
                    />
                </div>
                <div className="room-review">
                    <h4>Add Review</h4>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                    <div className="action-rate">
                        <Rating
                            name="simple-controlled"
                            value={rate}
                            onChange={(event, newValue) => {
                                setRate(newValue);
                            }}
                        />
                    </div>
                    <Button
                        className="btn-publish-review"
                        variant="outline-primary"
                        id="button-addon2"
                        onClick={handlePublishReview}>
                        Publish Review
                    </Button>
                </div>
            </div>
        </Layout>
    );
}

export default RoomBooking;
