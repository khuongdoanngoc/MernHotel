import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
    return (
        <div className="layout">
            <Header />
            <main>
                <ToastContainer 
                theme="dark"/>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
