import Layout from "../../components/Layout/Layout";
import "./styles.css";
import UserDashboardMenu from "../../components/Layout/UserDashboardMenu";

function UserOrders() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <UserDashboardMenu/>
                <div className="user-dashboard-content">
                    <h1>UserOrders</h1>
                </div>
            </div>
        </Layout>
    );
}

export default UserOrders;
