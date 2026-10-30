const testimonials = [
    {
        name: "Sarah Mitchell",
        initials: "SM",
        tag: "Food blogger",
        rating: 5,
        text: "The lamb kofta was out of this world. Warm service, lovely atmosphere — easily one of the best Mediterranean spots in Chicago!",
    },
    {
        name: "James Carter",
        initials: "JC",
        tag: "Regular guest",
        rating: 5,
        text: "We booked for our anniversary and the team made the evening special. The mezze platter is a must-try for anyone visiting.",
    },
    {
        name: "Amira Hassan",
        initials: "AH",
        tag: "Foodie & traveler",
        rating: 4,
        text: "Authentic flavors with a modern twist. The fresh lemon cake and mint tea were the perfect finish to a wonderful dinner.",
    },
    {
        name: "David Osei",
        initials: "DO",
        tag: "Local resident",
        rating: 5,
        text: "From the grilled octopus to the house-made hummus, everything tasted fresh and bold. Booking a table online took seconds.",
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials section" id="testimonials">
            <div className="container">
                <div className="section-head">
                    <span className="eyebrow">Testimonials</span>
                    <h2>What Our Guests Are Saying</h2>
                    <p>Real reviews from diners who enjoyed a night at Little Lemon.</p>
                </div>
                <div className="testimonial-cards">
                    {testimonials.map(({ name, initials, tag, rating, text }) => (
                        <article className="testimonial-card" key={name}>
                            <div className="stars" aria-label={`${rating} out of 5 star rating`}>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} aria-hidden="true">{i < rating ? "★" : "☆"}</span>
                                ))}
                            </div>
                            <p className="quote">“{text}”</p>
                            <footer className="reviewer">
                                <span className="avatar" aria-hidden="true">{initials}</span>
                                <div className="reviewer-info">
                                    <h3>{name}</h3>
                                    <span>{tag}</span>
                                </div>
                            </footer>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials;
