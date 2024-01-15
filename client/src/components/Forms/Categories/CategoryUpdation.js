import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../Layout/AdminDashboardMenu";
import { Button, Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { toast } from "react-toastify";

function CategoryUpdation() {
    const location = useLocation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const slug = location.pathname.split("/")[4];
        try {
            const getDescriptionCategory = async () => {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/category/${slug}`
                );
                if (data.success) {
                    const categoryDescription = data.categoryDescription;
                    setName(categoryDescription.name)
                    setDescription(categoryDescription.description)
                    setIsActive(categoryDescription.isActive);
                    setProducts(categoryDescription.products)
                }
            };
            getDescriptionCategory();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleCategorySave = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Name is Required!');
            return;
        }
        try {
            const slug = location.pathname.split("/")[4];
            const { data } = await axios.patch(`${process.env.REACT_APP_API}/api/v1/category/update`, {
                slug, name, description, products, isActive
            })
            if (data.success) {
                toast.success(data.message)
                navigate('/admin/dashboard/category')
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Update Category!");
            }
        }
    }

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <div className="df space-between">
                        <h2 className="dashboard-title">Edit Category</h2>
                        <Button
                            className="add-category-button"
                            variant="secondary"
                            onClick={() =>
                                (window.location.pathname =
                                    "/admin/dashboard/category")
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
                                placeholder="Please enter category name"
                                aria-label="category name"
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
                                placeholder="Please enter category description"
                                aria-label="category description"
                                value={description}
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
                                    setProducts(product);
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
                            onClick={handleCategorySave}
                        >
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryUpdation;
