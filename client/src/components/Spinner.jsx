import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Layout from "./Layout/Layout";

function Spinner() {
    const [count, setCount] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => --prevCount);
        }, 1000);
        if (count == 0) {
            toast.error("Unauthorized!");
            navigate("/");
        }
        return () => {
            clearInterval(interval);
        };
    }, [count, navigate]);

    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "58vh",
                }}>
                <HashLoader color="#24292e" />
            </div>
        </Layout>
    );
}

export default Spinner;
