import { useLocation } from "react-router-dom";
import { useState } from "react";

// Placeholder links are anchored to the new home page sections when possible.
// Order online and Login have no page yet, so they keep pointing at the home page.
const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/#about", label: "About", placeholder: true },
    { to: "/#specials", label: "Menu", placeholder: true },
    { to: "/booking", label: "Reservations", end: true },
    { to: "/", label: "Order online", placeholder: true },
    { to: "/", label: "Login", placeholder: true },
];

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // "end" = active only on an exact path match
    const isCurrent = (to, end) => {
        const path = to.split("#")[0] || "/";
        return end ? location.pathname === path : location.pathname === path || location.pathname.startsWith(path + "/");
    };

    return (
        <header>
            <div className="container">
                <div className='logo'>
                    <img src='/logo.png' alt='Little Lemon restaurant logo' />
                </div>
                <button
                    type="button"
                    className="menu-toggle"
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
                <nav aria-label="Main navigation" className={menuOpen ? "open" : ""}>
                    <ul>
                        {navLinks.map(({ to, label, end, placeholder }) => (
                            <li key={label}>
                                <a
                                    href={to}
                                    aria-current={!placeholder && isCurrent(to, end) ? "page" : undefined}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
