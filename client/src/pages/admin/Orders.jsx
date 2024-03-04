import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";
import Layout from "../../components/Layout/Layout";

function Orders() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <h2
                        className="dashboard-title"
                        style={{ marginBottom: "27px" }}>
                        Orders
                    </h2>
                    <hr />
                </div>
            </div>
        </Layout>
    );
}

export default Orders;
