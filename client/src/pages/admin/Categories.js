import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";
import CategoriesForm from "../../components/Forms/Categories/CategoriesForm";
import Layout from "../../components/Layout/Layout";
import { Card, Button } from "react-bootstrap";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Categories() {
    const [isAdding, setIsAdding] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/category/`
            );
            console.log(data);
            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error(data.message);
            }
        };
        getCategories();
    }, []);

    const handleAddBtn = (e) => {
        e.preventDefault();
        setIsAdding(!isAdding);
    };

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <div className="df space-between">
                        <h2 className="dashboard-title">
                            {!isAdding ? "Categories" : "Add Category"}
                        </h2>
                        <Button
                            className="add-category-button"
                            variant="secondary"
                            onClick={handleAddBtn}>
                            {!isAdding ? "Add" : "Back"}
                        </Button>{" "}
                    </div>
                    <hr />
                    {isAdding ? (
                        <CategoriesForm />
                    ) : (
                        <div className="category-cards">
                            {categories.map((category) => (
                                <a href={"category/" + category.slug} key={category._id}>
                                    <Card>
                                        <Card.Body>
                                            <h2 className="category-title">
                                                {category.name}
                                            </h2>
                                            <span>{category.description}</span>
                                        </Card.Body>
                                    </Card>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Categories;
