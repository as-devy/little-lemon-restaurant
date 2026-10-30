const navLinks = [
    { to: "/#hero", label: "Home" },
    { to: "/#about", label: "About" },
    { to: "/#specials", label: "Menu" },
    { to: "/booking", label: "Reservations" },
    { to: "/", label: "Order online" },
    { to: "/", label: "Login" },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <img src="/logo.png" alt="Little Lemon restaurant logo" className="footer-logo" />
                    <p>Fresh flavors, family traditions.</p>
                </div>
                <nav aria-label="Footer navigation">
                    <h3>Navigation</h3>
                    <ul>
                        {navLinks.map(({ to, label }) => (
                            <li key={label}><a href={to}>{label}</a></li>
                        ))}
                    </ul>
                </nav>
                <div className="footer-contact">
                    <h3>Contact</h3>
                    <ul>
                        <li>2453 Edgewater Dr, Chicago, IL</li>
                        <li><a href="tel:+13125550187">+1 (312) 555-0187</a></li>
                        <li><a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h3>Social media</h3>
                    <ul>
                        <li><a href="#" aria-label="Facebook">Facebook</a></li>
                        <li><a href="#" aria-label="Instagram">Instagram</a></li>
                        <li><a href="#" aria-label="Twitter">Twitter</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Little Lemon Inc. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
