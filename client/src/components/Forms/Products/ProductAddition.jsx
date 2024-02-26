import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "../styles.css";
import { toast } from "react-toastify";
import axios from "axios";

function ProductAddition() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(1);
    const [isActive, setIsActive] = useState(true);

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Name is Required!");
            return;
        }
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/create`,
                {
                    name,
                    description,
                    quantity,
                    price,
                    isActive,
                }
            );
            if (data.success) {
                toast.success(data.message);
                window.location.reload();
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Add product!");
            }
        }
    };
    return (
        <div className="category-form">
            <div className="">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    className="input-focus"
                    placeholder="Please enter product name"
                    aria-label="product name"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    className="input-focus"
                    as="textarea"
                    placeholder="Please enter product description"
                    aria-label="product description"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="d-flex space-between">
                <div>
                    <Form.Label htmlFor="quantity">Quantity</Form.Label>
                    <Form.Control
                        className="input-focus"
                        placeholder="Please enter quantity"
                        aria-label="quantity"
                        aria-describedby="basic-addon1"
                        style={{ width: "390px"}}
                        required
                        defaultValue={1}
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div>
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Form.Control
                        className="input-focus"
                        placeholder="Please enter price"
                        aria-label="price"
                        aria-describedby="basic-addon1"
                        style={{ width: "390px"}}
                        defaultValue={1}
                        required
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Form.Label htmlFor="isActive">isActive?</Form.Label>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    defaultChecked
                    onClick={() => setIsActive(!isActive)}
                />
            </div>
            <hr />
            <button
                className="submit-button"
                type="submit"
                onClick={handleProductSubmit}>
                <span>Add</span>
            </button>
        </div>
    );
}

export default ProductAddition;
