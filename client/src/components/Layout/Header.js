import "./styles.css";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <header className="header">
            <div className="header-info">
                <div className="header-info-items">
                    <i class="bi bi-truck"></i>
                    <span>Free Shipping</span>
                </div>
                <div className="header-info-items">
                    <i class="bi bi-credit-card"></i>
                    <span>Payment Methods</span>
                </div>
                <div className="header-info-items">
                    <i class="bi bi-telephone"></i>
                    <span>Call us 951-999-9999</span>
                </div>
            </div>
            <div className="header-container">
                <div className="header-logo">
                    <button
                        className="header-icon-sidebar"
                        onClick={handleShow}>
                        <i className="bi bi-justify" style={{ fontSize: '23px'}}></i>
                    </button>
                    <a href="/">
                        <span className="header-web-name">MERN Store</span>
                    </a>
                    <Offcanvas
                        show={show}
                        onHide={handleClose}
                        scroll={true}
                        backdrop={true}>
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
                <div className="header-search"></div>
                <div className="header-right-items"></div>
            </div>
        </header>
    );
}

export default Header;
