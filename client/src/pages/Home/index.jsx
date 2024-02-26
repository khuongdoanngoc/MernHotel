// css import
import "./styles.css";
import Layout from "../../components/Layout/Layout";

function Home() {
    return (
        <div>
            <Layout>
                <div className="home-wrapper">
                    <div className="home-leftside-content">
                        <div className="home-leftside-content-banner1"></div>
                        <div className="home-leftside-content-banner2"></div>
                    </div>
                    <div className="home-center-content"></div>
                    <div className="home-rightside-content">
                        <div className="home-leftside-content-banner1"></div>
                        <div className="home-leftside-content-banner2"></div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Home;
