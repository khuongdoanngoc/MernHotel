import "./styles.css";
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filter, setFilter] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const [pageNum, setPageNum] = useState(1);
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === pageNum}>
                {number}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product`
            );
            setRooms(data.products);
        };
        try {
            getRooms();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/category/`
            );
            if (!data.success) {
                toast.error("error get category");
                return;
            }
            setCategories(data.categories);
        };
        try {
            getCategories();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const filteredRooms = rooms.filter((room) => {
        const roomSlug = room.slug.toLowerCase();
        const filterSlug = filter.toLowerCase();

        if (filter === "") {
            return true;
        } else if (
            filterSlug === "single" ||
            filterSlug === "double" ||
            filterSlug === "family"
        ) {
            return roomSlug.includes(filterSlug);
        } else {
            return false;
        }
    });

    return (
        <Layout>
            <div className="rooms-wrapper">
                <div className="filter">
                    <div className="showing-info">
                        <span>Showing: 1 - 10 rooms of 12 rooms</span>
                    </div>
                    <div className="sortby">
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => {
                                setFilter(e.target.value);
                            }}>
                            <option defaultChecked value="">
                                All
                            </option>
                            {categories.map((category) => (
                                <option key={category._id} value={category.slug}>
                                    {category.name} rooms
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </div>
                <div className="booth">
                    {filteredRooms.map((room) => (
                        <Card style={{ width: "263.5px" }} key={room._id}>
                            <Card.Img variant="top" src={`${room.imgUrl}`} />
                            <Card.Body>
                                <Card.Title>{room.name}</Card.Title>
                                <Card.Text>{room.description}</Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`${room._id}`);
                                    }}>
                                    ${room.pricePerDay}
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <Pagination size="sm">{items}</Pagination>
            </div>
        </Layout>
    );
}

export default Rooms;
