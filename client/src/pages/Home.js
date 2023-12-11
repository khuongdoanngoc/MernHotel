import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

function Home() {
    const [auth] = useAuth();

    useEffect(() => {
        console.log('auth in login: ', auth)
    }, [auth])

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
