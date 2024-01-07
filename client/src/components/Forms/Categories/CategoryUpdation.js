import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../Layout/AdminDashboardMenu";
import { Button } from "react-bootstrap";

function CategoryUpdation() {
    const [slug, setSlug] = useState("");
    const location = useLocation();

    useEffect(() => {
        setSlug(location.pathname.split("/")[4]);
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
                    <hr/>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryUpdation;
