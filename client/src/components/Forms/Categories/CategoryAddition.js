import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "../styles.css";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";

function CategoryAddition() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [isActive, setIsActive] = useState(true);

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        console.log(description)
        console.log(products)
        console.log(isActive)
        if (!name) {
            toast.error('Name is Required!');
            return;
        }
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create`, {
                name, description, products, isActive
            })
            if (data.success) {
                toast.success(data.message)
                window.location.reload();
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Add Category!");
            }
        }
    }
    return (
        <div className="category-form">
            <div className="">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    className="input-focus"
                    placeholder="Please enter category name"
                    aria-label="category name"
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
                    placeholder="Please enter category description"
                    aria-label="category description"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="">
                <Multiselect
                    isObject={false}
                    options={[
                        "Option 1",
                        "Option 2",
                        "Option 3",
                        "Option 4",
                        "Option 5",
                    ]}
                    onSelect={(product) => {
                        setProducts(product)
                    }}
                    style={{
                        chips: {
                            background: "rgb(236 236 236)",
                            color: "black",
                        },
                        multiselectContainer: {
                            color: "black",
                        },
                    }}
                />
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
                onClick={handleCategorySubmit}>
                <span>Add</span>
            </button>
        </div>
    );
}

export default CategoryAddition;
