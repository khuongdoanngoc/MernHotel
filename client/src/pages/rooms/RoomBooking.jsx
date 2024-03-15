import { useLocation, useNavigate } from "react-router-dom";
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
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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
    const navigate = useNavigate();

    // auth
    const [auth] = useAuth();

    // review states
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(5);
    const [reviews, setReviews] = useState([]);

    // confirm book states
    const [show, setShow] = useState(false);
    const [note, setNote] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!auth.token) {
            toast.warning("please login to use this function");
            navigate("/login");
        } else {
            setShow(true);
        }
    };

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
            setReviews(data.reviews);
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
        if (!auth.token) {
            toast.error("please login to use this function");
            return;
        }
        if (!comment) {
            toast.error("comment are required!");
            return;
        }
        const publish = async () => {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/review/create`,
                {
                    comment,
                    rate,
                    author: auth.user.name,
                    productId,
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

    const handleSubmitBooking = (e) => {
        e.preventDefault();

        const doOrder = async () => {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/order/create`,
                {
                    user: auth.user._id,
                    product: room._id,
                    checkin: formatDayjs(checkin),
                    checkout: formatDayjs(checkout),
                    total,
                    note,
                }
            );
            if (data.success) {
                toast.success("order success!");
                navigate(`/order/success/${data.newOrder._id}`);
            }
        };

        try {
            doOrder();
        } catch (error) {
            throw new error();
        }
    };

    const handleAddToWishList = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/user/add-to-wishlist`,
                {
                    userId: auth.user._id,
                    productId,
                }
            );
            if (!data.success) {
                toast.error("add to wishlist failure!");
                return;
            }
            toast.success("add to wishlist success!");
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (createdValue) => {
        const createdDate = new Date(createdValue);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return createdDate.toLocaleDateString("en-US", options);
    };

    const starCount = (review, rate) => {
        let count = 0;
        for (let i = 0; i < review.length; i++) {
            const element = review[i];
            if (element.rate === rate) {
                count++;
            }
        }
        return count;
    };

    const avgRate = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalRate = reviews.reduce(
            (accumulator, currentReview) => accumulator + currentReview.rate,
            0
        );
        return totalRate / reviews.length;
    };

    const formatDayjs = (dayjsDate) => {
        return `${dayjsDate.$M + 1}-${dayjsDate.$D}-${dayjsDate.$y}`;
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
                                id="button-addon2"
                                onClick={handleShow}>
                                Book now
                            </Button>
                        </div>
                        <div className="btn-add-to-cart">
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                                onClick={handleAddToWishList}>
                                    Add to wishlist
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="room-rates">
                <div className="room-rating-result">
                    <h4>Rating</h4>
                    <div className="room-rating-title">
                        <Rating
                            name="read-only"
                            value={avgRate(reviews)}
                            readOnly
                        />
                        <span>bases on {reviews.length} reviews</span>
                    </div>
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
                                    "0 star",
                                ],
                            },
                        ]}
                        series={[
                            {
                                data: [
                                    starCount(reviews, 5),
                                    starCount(reviews, 4),
                                    starCount(reviews, 3),
                                    starCount(reviews, 2),
                                    starCount(reviews, 1),
                                    starCount(reviews, 0),
                                ],
                            },
                        ]}
                        width={400}
                        height={230}
                    />
                </div>
                <div className="room-review">
                    <div className="cards review-cards">
                        {reviews.map((review) => (
                            <div key={review._id}>
                                <Card>
                                    <Card.Body id="review-card">
                                        <div className="review-card-comment">
                                            <div className="review-title">
                                                <h2 className="category-title">
                                                    {review.author}
                                                </h2>
                                                <span
                                                    style={{
                                                        fontSize: "15px",
                                                    }}>
                                                    {formatDate(review.created)}
                                                </span>
                                            </div>
                                            <span>{review.comment}</span>
                                        </div>
                                        <div className="review-card-rate">
                                            <Rating
                                                name="read-only"
                                                value={review.rate}
                                                readOnly
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {auth.token ? (
                        <ul>
                            <li>Customer Name: {auth.user.name}</li>
                            <li>
                                <strong>Room Name:</strong> {room.name}
                            </li>
                            <li>
                                <strong>Check-in Date:</strong>{" "}
                                {formatDayjs(checkin)}
                            </li>
                            <li>
                                <strong>Check-out Date:</strong>{" "}
                                {formatDayjs(checkout)}
                            </li>
                            <li style={{ color: "red" }}>
                                <strong>Total Price:</strong> ${total}
                            </li>
                            <li>Note</li>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </ul>
                    ) : (
                        <div>no auth</div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitBooking}>
                        Agree
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
}

export default RoomBooking;
