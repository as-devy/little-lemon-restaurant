import { useLocation } from "react-router-dom";

// Placeholder links (ABOUT, MENU, Order online, Login) have no page yet,
// so they keep pointing at the home page. They are not marked as current.
const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/", label: "ABOUT", placeholder: true },
    { to: "/", label: "MENU", placeholder: true },
    { to: "/booking", label: "Reservations", end: true },
    { to: "/", label: "Order online", placeholder: true },
    { to: "/", label: "Login", placeholder: true },
];

const Header = () => {
    const location = useLocation();

    // "end" = active only on an exact path match
    const isCurrent = (to, end) =>
        end ? location.pathname === to : location.pathname === to || location.pathname.startsWith(to + "/");

    return (
        <header>
            <div className="container">
                <div className='logo'>
                    <img src='/logo.png' alt='Little Lemon restaurant logo' />
                </div>
                <nav aria-label="Main navigation">
                    <ul>
                        {navLinks.map(({ to, label, end, placeholder }) => (
                            <li key={label}>
                                <a
                                    href={to}
                                    aria-current={!placeholder && isCurrent(to, end) ? "page" : undefined}
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
