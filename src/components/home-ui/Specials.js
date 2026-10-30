const Specials = () => {
    return (
        <section className="specials section" id="specials">
            <div className="container">
                <div className="head">
                    <h1>This weeks specials!</h1>
                    <button type="button" className="btn">Online Menu</button>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="img">
                            <img src="/special.png" alt="Greek Salad" />
                        </div>
                        <div className="info">
                            <h3>Greek Salad</h3>
                            <span className="price">$ 12.99</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button type="button">Order a delivery <img src="/delivery-icon.png" alt="" aria-hidden="true" /></button>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src="/special.png" alt="Greek Salad" />
                        </div>
                        <div className="info">
                            <h3>Greek Salad</h3>
                            <span className="price">$ 12.99</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button type="button">Order a delivery <img src="/delivery-icon.png" alt="" aria-hidden="true" /></button>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src="/special.png" alt="Greek Salad" />
                        </div>
                        <div className="info">
                            <h3>Greek Salad</h3>
                            <span className="price">$ 12.99</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button type="button">Order a delivery <img src="/delivery-icon.png" alt="" aria-hidden="true" /></button>
                    </div>
                    <div className="card">
                        <div className="img">
                            <img src="/special.png" alt="Greek Salad" />
                        </div>
                        <div className="info">
                            <h3>Greek Salad</h3>
                            <span className="price">$ 12.99</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button type="button">Order a delivery <img src="/delivery-icon.png" alt="" aria-hidden="true" /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Specials;