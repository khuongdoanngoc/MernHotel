import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../Layout/AdminDashboardMenu";
import { Button, Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";

function CategoryUpdation() {
    const location = useLocation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const slug = location.pathname.split("/")[4];
        console.log(slug)
        try {
            const getDescriptionCategory = async () => {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/${slug}`)
                console.log(data)
            }
            getDescriptionCategory()
        } catch (error) {
            console.log(error)
        }
    }, []);

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
                                defaultChecked
                                onClick={() => setIsActive(!isActive)}
                            />
                        </div>
                        <hr />
                        <button
                            className="submit-button"
                            type="submit"
                            // onClick={handleCategorySubmit}
                        >
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryUpdation;
