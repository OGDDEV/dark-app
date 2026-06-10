import { useEffect, useState } from "react";
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (menuOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2 className="logo">Dark Weather</h2>
                <button
                    type="button"
                    className={`menu-toggle${menuOpen ? " open" : ""}`}
                    onClick={toggleMenu}
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            <div className={`navbar-menu${menuOpen ? " active" : ""}`}>
                <ul className="nav-links">
                    <li><b>Home</b></li>
                    <li>Download App</li>
                    <li>Contact us</li>
                </ul>
            </div>

            <button className="sign-up-btn">Sign up</button>
        </nav>
    );
}

export default Navbar;
