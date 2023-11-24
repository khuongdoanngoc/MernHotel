import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Spinner() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preCount) => --preCount);
        }, 1000);
        if (count === 0) {
            navigate("/login");
        }
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
            }}>
            <HashLoader color="#24292e" />
        </div>
    );
}

export default Spinner;
