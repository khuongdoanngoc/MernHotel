import Layout from "../../components/Layout/Layout";
import "../user/styles.css";
import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";

function AdminDashboard() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu/>
                <div className="user-dashboard-content">
                    <h1>Account details</h1>
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
