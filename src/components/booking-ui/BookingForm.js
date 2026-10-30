import { useState } from "react";

const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: 1,
        occasion: "Birthday"
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm(formData)
    };

    return (
        <main className="booking section">
            <div className="container">
                <form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }} onSubmit={handleSubmit}>
                    <label htmlFor="date">Choose date</label>
                    <input 
                        type="date" 
                        id="date" 
                        onChange={e => {
                            handleChange(e);
                            const selectedDateTimes = window.fetchAPI(new Date(e.target.value));
                            dispatch({
                                type: "SET_TIMES", payload: selectedDateTimes
                            });
                        }} 
                        value={formData.date} 
                    />

                    <label htmlFor="time">Choose time</label>
                    <select 
                        id="time" 
                        onChange={handleChange}
                        value={formData.time}
                    >
                        <option value="" disabled>Select a time</option>
                        {availableTimes.map((timeOption, index) => (
                            <option key={index} value={timeOption}>{timeOption}</option>
                        ))}
                    </select>

                    <label htmlFor="guests">Number of guests</label>
                    <input 
                        type="number" 
                        placeholder="1" 
                        min="1" 
                        max="10" 
                        id="guests" 
                        onChange={handleChange} 
                        value={formData.guests} 
                    />

                    <label htmlFor="occasion">Occasion</label>
                    <select 
                        id="occasion" 
                        onChange={handleChange} 
                        value={formData.occasion}
                    >
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                    </select>

                    <input className="btn" type="submit" value="Make Your reservation" />
                </form>
            </div>
        </main>
    );
};

export default BookingForm;