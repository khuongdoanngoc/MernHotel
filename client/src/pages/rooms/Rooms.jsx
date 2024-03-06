import "./styles.css";
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate()

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

    return (
        <Layout>
            <div className="rooms-wrapper">
                <div className="filter">
                    <div className="showing-info">
                        <span>Showing: 1 - 10 rooms of 12 rooms</span>
                    </div>
                    <div className="sortby">
                        <Form.Select aria-label="Default select example">
                            <option defaultChecked value="1">
                                All
                            </option>
                            <option value="2">Single rooms</option>
                            <option value="3">Double rooms</option>
                            <option value="3">Family rooms</option>
                        </Form.Select>
                    </div>
                </div>
                <div className="booth">
                    {rooms.map((room) => (
                        <Card style={{ width: "263.5px" }} key={room._id}>
                            <Card.Img
                                variant="top"
                                src={`${room.imgUrl}`}
                            />
                            <Card.Body>
                                <Card.Title>{room.name}</Card.Title>
                                <Card.Text>{room.description}</Card.Text>
                                <Button variant="primary" onClick={(e) => {e.preventDefault(); navigate(`${room._id}`) }}>${room.pricePerDay}</Button>
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
