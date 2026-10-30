import BookingForm from "../booking-ui/BookingForm"

const BookingPage = ({ availableTimes, dispatch, submitForm })=>{
    return(
        <>
            <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
        </>
    )
}

export default BookingPage;