import Celebration from "../Celebration"

const ConfirmedBooking = () => {
    return (
        <>
            <h1 style={{ gridColumn: '1 / -1', margin: '60px auto', textTransform: "capitalize" }}>booking has been confirmed</h1>
            <Celebration />
        </>
    )
}

export default ConfirmedBooking