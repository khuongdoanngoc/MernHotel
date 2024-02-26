import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";
import ProductAddition from "../../components/Forms/Products/ProductAddition";
import Layout from "../../components/Layout/Layout";
import { Card, Button } from "react-bootstrap";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Products() {
    const [isAdding, setIsAdding] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/`
            );
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        };
        getProducts();
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
                            {!isAdding ? "Products" : "Add Product"}
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
                        <ProductAddition />
                    ) : (
                        <div className="category-cards">
                            {products.map((product) => (
                                <a href={"product/" + product.slug} key={product._id}>
                                    <Card>
                                        <Card.Body>
                                            <h2 className="category-title">
                                                {product.name}
                                            </h2>
                                            <span>{product.description}</span>
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

export default Products;
