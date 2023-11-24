import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

function Home() {
    const [auth, setAuth] = useAuth();

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
