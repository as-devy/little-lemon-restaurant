import Celebration from "../Celebration"

const ConfirmedBooking = () => {
    return (
        <>
            {/* Announce the confirmation to assistive technology (visually hidden) */}
            <p className="visually-hidden" role="status">Booking has been confirmed</p>
            <h1 style={{ gridColumn: '1 / -1', margin: '60px auto', textTransform: "capitalize" }}>booking has been confirmed</h1>
            <Celebration />
        </>
    )
}

export default ConfirmedBooking