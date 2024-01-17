import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../Layout/AdminDashboardMenu";
import { Button, Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { toast } from "react-toastify";

function ProductUpdation() {
    const location = useLocation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const slug = location.pathname.split("/")[4];
        try {
            const getDescriptionProduct = async () => {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/product/${slug}`
                );
                if (data.success) {
                    const productDescription = data.productDescription;
                    setName(productDescription.name);
                    setDescription(productDescription.description);
                    setIsActive(productDescription.isActive);
                    setQuantity(productDescription.quantity);
                    setPrice(productDescription.price);
                }
            };
            getDescriptionProduct();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleProductSave = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Name is Required!");
            return;
        }
        try {
            const slug = location.pathname.split("/")[4];
            const { data } = await axios.patch(
                `${process.env.REACT_APP_API}/api/v1/product/update`,
                {
                    slug,
                    name,
                    description,
                    quantity,
                    price,
                    isActive,
                }
            );
            if (data.success) {
                toast.success(data.message);
                navigate("/admin/dashboard/product");
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Update Category!");
            }
        }
    };

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <div className="df space-between">
                        <h2 className="dashboard-title">Edit Product</h2>
                        <Button
                            className="add-category-button"
                            variant="secondary"
                            onClick={() =>
                                (window.location.pathname =
                                    "/admin/dashboard/product")
                            }>
                            Back
                        </Button>{" "}
                    </div>
                    <hr />
                    <div className="category-form">
                        <div className="">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control
                                className="input-focus"
                                placeholder="Please enter product name"
                                aria-label="product name"
                                aria-describedby="basic-addon1"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <Form.Label htmlFor="description">
                                Description
                            </Form.Label>
                            <Form.Control
                                className="input-focus"
                                as="textarea"
                                placeholder="Please enter product description"
                                aria-label="product description"
                                value={description}
                                aria-describedby="basic-addon1"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="d-flex space-between">
                            <div>
                                <Form.Label htmlFor="quantity">
                                    Quantity
                                </Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter quantity"
                                    aria-label="quantity"
                                    aria-describedby="basic-addon1"
                                    style={{ width: "390px" }}
                                    required
                                    defaultValue={1}
                                    type="number"
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Form.Label htmlFor="price">Price</Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter price"
                                    aria-label="price"
                                    aria-describedby="basic-addon1"
                                    style={{ width: "390px" }}
                                    defaultValue={1}
                                    required
                                    type="number"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Form.Label htmlFor="isActive">
                                isActive?
                            </Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                            />
                        </div>
                        <hr />
                        <button
                            className="submit-button"
                            type="submit"
                            onClick={handleProductSave}>
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductUpdation;
