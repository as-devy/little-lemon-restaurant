const Header = () => {
    return (
        <header>
            <div className="container">
                <div className='logo'>
                    <img src='/logo.png' alt='logo' />
                </div>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">ABOUT</a></li>
                        <li><a href="/">MENU</a></li>
                        <li><a href="/">Reservations</a></li>
                        <li><a href="/">Order online</a></li>
                        <li><a href="/">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;