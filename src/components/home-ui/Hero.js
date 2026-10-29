const Hero = () => {
    return (
        <main className='hero section'>
            <div className="container">
                <div className="content">
                    <div className="heads">
                        <h1>Little Lemon</h1>
                        <h5>Chicago</h5>
                    </div>
                    <p>
                        We are a family-owned Mediterranean restaurant dedicated to serving authentic, generation-passed-down recipes made from the freshest local ingredients and aromatic herbs. Blending rich culinary traditions with a modern twist, we offer a welcoming atmosphere and bold, unforgettable flavors for every guest.
                    </p>
                    <button className="btn">Reserve a Table</button>
                </div>
                <div className="img">
                    <img src="/hero-img.png" alt="hero-img"/>
                </div>
            </div>
        </main>
    )
}

export default Hero;