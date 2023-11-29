import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

function Home() {
    const [auth] = useAuth();

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const dataReceived = urlSearchParams.get("isAuthorized");
        if (dataReceived === "no") {
            toast.warning("Unauthorized!");
        }
    }, []);

    return (
        <div>
            <Layout>
                <h1>Home Page</h1>
                <pre>isLoggedIn: {JSON.stringify(auth)}</pre>
            </Layout>
        </div>
    );
}

export default Home;
