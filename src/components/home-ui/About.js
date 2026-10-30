const About = () => {
    return (
        <section className="about section" id="about">
            <div className="container">
                <div className="content">
                    <span className="eyebrow">Our Story</span>
                    <h2>Little Lemon</h2>
                    <h5>Chicago, Illinois</h5>
                    <p>
                        We are a family-owned Mediterranean restaurant dedicated to serving
                        authentic, generation-passed-down recipes made from the freshest local
                        ingredients and aromatic herbs.
                    </p>
                    <p>
                        Blending rich culinary traditions with a modern twist, we offer a
                        welcoming atmosphere and bold, unforgettable flavors for every guest —
                        from our first mezze in 1987 to today.
                    </p>
                    <ul className="about-features">
                        <li>🌿 Fresh, locally sourced ingredients daily</li>
                        <li>👨‍🍳 Recipes passed down three generations</li>
                        <li>🍷 A cozy dining room with a terrace</li>
                    </ul>
                </div>
                <div className="img" aria-hidden="true">
                    <img className="img-back" src="/special.png" alt="" />
                    <img className="img-front" src="/hero-img.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default About;
