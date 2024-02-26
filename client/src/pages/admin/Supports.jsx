import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";
import Layout from "../../components/Layout/Layout";

function Supports() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <h1>Supports</h1>
                </div>
            </div>
        </Layout>
    );
}

export default Supports;
