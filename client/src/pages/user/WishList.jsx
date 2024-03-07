import Layout from "../../components/Layout/Layout";
import "./styles.css";
import UserDashboardMenu from "../../components/Layout/UserDashboardMenu";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

function WishList() {
    const [wishlist, setWishList] = useState([]);
    const [auth] = useAuth();

    useEffect(() => {
        try {
            const getWishList = async () => {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_API}/api/v1/user/get-wishlist-by-userid`,
                    {
                        _id: auth.user._id,
                    }
                );
                setWishList(data.user.wishlist)
            };
            getWishList();
        } catch (error) {}
    }, []);


    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <UserDashboardMenu />
                <div className="user-dashboard-content">
                    <h2
                        className="dashboard-title"
                        style={{ marginBottom: "27px" }}>
                        WishList
                    </h2>{" "}
                    <hr />
                    <div className="category-cards">
                        {wishlist.map((product) => (
                            <a key={product._id} href={`/rooms/${product._id}`}>
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
                </div>
            </div>
        </Layout>
    );
}

export default WishList;
