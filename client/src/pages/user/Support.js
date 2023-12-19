import DashboardMenu from "../../components/Layout/DashboardMenu";
import Layout from "../../components/Layout/Layout";


function Supports() {
    return ( 
        <Layout>
            <div className="user-dashboard-wrapper">
                <DashboardMenu/>
                <div className="user-dashboard-content">
                    <h1>Support</h1>
                </div>
            </div>
        </Layout>
     );
}

export default Supports;