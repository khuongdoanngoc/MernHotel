import Layout from "../../components/Layout/Layout";
import "./styles.css";
import UserDashboardMenu from "../../components/Layout/UserDashboardMenu";

function WishList() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <UserDashboardMenu/>
                <div className="user-dashboard-content">
                    <h1>WishList</h1>
                </div>
            </div>
        </Layout>
    );
}

export default WishList;
