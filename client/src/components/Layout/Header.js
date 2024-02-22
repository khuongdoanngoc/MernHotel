import "./styles.css";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

function Header() {
    // left sidebar configurations
    const [showLeft, setShowLeft] = useState(false);
    const handleCloseLeft = () => setShowLeft(false);
    const handleShowLeft = () => setShowLeft(true);
    const [auth, setAuth] = useAuth();

    // right sidebar configurations
    const [showRight, setShowRight] = useState(false);
    const handleCloseRight = () => setShowRight(false);
    const handleShowRight = () => setShowRight(true);

    const handleLogout = () => {
        toast.success("Logout Successfully");
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
    };

    return (
        <header className="header">
            <div className="header-info">
                <div className="header-info-items">
                    <i className="bi bi-truck"></i>
                    <span>Free Shipping</span>
                </div>
                <div className="header-info-items">
                    <i className="bi bi-credit-card"></i>
                    <span>Payment Methods</span>
                </div>
                <div className="header-info-items">
                    <i className="bi bi-telephone"></i>
                    <span>Call us 951-999-9999</span>
                </div>
            </div>
            <div className="header-container">
                <div className="header-logo">
                    <button
                        className="header-icon-sidebar"
                        onClick={handleShowLeft}>
                        <i
                            className="bi bi-justify"
                            style={{ fontSize: "23px" }}></i>
                    </button>
                    <a href="/">
                        <span className="header-web-name">MERN Hotel</span>
                    </a>
                    <Offcanvas
                        show={showLeft}
                        onHide={handleCloseLeft}
                        backdrop={true}
                        scroll={true}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Some text as placeholder. In real life you can have
                            the elements you have chosen. Like, text, images,
                            lists, etc.
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
                <div className="header-search">
                    <Form.Control className="input-focus" placeholder="Search Products" />
                </div>
                <div className="header-right-items">
                    <div className="header-card">
                        <button
                            style={{ all: "initial", cursor: "pointer" }}
                            onClick={handleShowRight}>
                            <i
                                className="bi bi-cart"
                                style={{ fontSize: "23px" }}></i>
                        </button>
                        <Offcanvas
                            show={showRight}
                            onHide={handleCloseRight}
                            backdrop={true}
                            scroll={true}
                            placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                Some text as placeholder. In real life you can
                                have the elements you have chosen. Like, text,
                                images, lists, etc.
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <div className="header-brands text-right-items">Brands</div>
                    <div className="header-shop text-right-items">Rooms</div>
                    <div className="header-auth text-right-items">
                        <Dropdown className="header-auth-dropdown">
                            {!auth.user ? (
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic">
                                    Welcome
                                </Dropdown.Toggle>
                            ) : (
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic">
                                    {auth.user.name}
                                </Dropdown.Toggle>
                            )}
                            <Dropdown.Menu>
                                {!auth.user ? (
                                    <>
                                        <Dropdown.Item href="/login">
                                            Login
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/register">
                                            Sign Up
                                        </Dropdown.Item>
                                    </>
                                ) : (
                                    <div>
                                        {auth.user.role === 1 ? (
                                            <Dropdown.Item href="/admin/dashboard">
                                                Dashboard
                                            </Dropdown.Item>
                                        ) : (
                                            <Dropdown.Item href="/user/dashboard">
                                                Dashboard
                                            </Dropdown.Item>
                                        )}
                                        <Dropdown.Item
                                            href="/login"
                                            onClick={handleLogout}>
                                            Logout
                                        </Dropdown.Item>
                                    </div>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
