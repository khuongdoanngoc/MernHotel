import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";
import Layout from "../../components/Layout/Layout";

function Reviews() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <h1>Reviews</h1>
                </div>
            </div>
        </Layout>
    );
}

export default Reviews;
