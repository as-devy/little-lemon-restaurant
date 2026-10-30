import { useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
    const validationSchema = Yup.object({
        date: Yup.date()
            .required('Date is required'),
        time: Yup.string()
            .required('Please select a time slot')
            .oneOf(availableTimes, 'Invalid time slot selected'),
        guests: Yup.number()
            .required('Number Of Guests is required')
            .min(1, "Guests Can't be less than 1")
            .integer('Guests must be a whole number'),
        occasion: Yup.string()
            .required("Please select an occasion")
            .oneOf(["Birthday", "Anniversary"], "Invalid occasion selected")
    });

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            guests: 1,
            occasion: 'Birthday',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitForm(values)
        },
    });

    // If the available times change (new date selected), clear a time that is no longer valid
    useEffect(() => {
        if (formik.values.time && !availableTimes.includes(formik.values.time)) {
            formik.setFieldValue('time', '')
        }
    }, [availableTimes]);

    // ARIA props that link a field to its validation error (only when an error is showing)
    const errorProps = (name) => {
        const isError = Boolean(formik.touched[name] && formik.errors[name]);
        return {
            'aria-invalid': isError,
            'aria-describedby': isError ? `error-${name}` : undefined,
        };
    };

    return (
        <main className="booking section">
            <div className="container">
                <form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }} onSubmit={formik.handleSubmit}>
                    <label htmlFor="date">Choose date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        {...formik.getFieldProps('date')}
                        {...errorProps('date')}
                        onChange={(e) => {
                            const nextDate = e.target.value;

                            formik.setFieldValue('date', nextDate);

                            const selectedDateTimes = window.fetchAPI(new Date(nextDate));
                            dispatch({
                                type: "SET_TIMES",
                                payload: selectedDateTimes,
                            });
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.date && formik.errors.date && (
                        <span className="error" id="error-date" role="alert">{formik.errors.date}</span>
                    )}

                    <label htmlFor="time">Choose time</label>
                    <select
                        id="time"
                        name="time"
                        {...formik.getFieldProps('time')}
                        {...errorProps('time')}
                    >
                        <option value="" disabled>Select a time</option>
                        {availableTimes.map((timeOption, index) => (
                            <option key={index} value={timeOption}>{timeOption}</option>
                        ))}
                    </select>
                    {formik.touched.time && formik.errors.time && (
                        <span className="error" id="error-time" role="alert">{formik.errors.time}</span>
                    )}

                    <label htmlFor="guests">Number of guests</label>
                    <input
                        type="number"
                        placeholder="1"
                        min="1"
                        max="10"
                        id="guests"
                        {...formik.getFieldProps('guests')}
                        {...errorProps('guests')}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.guests && formik.errors.guests && (
                        <span className="error" id="error-guests" role="alert">{formik.errors.guests}</span>
                    )}

                    <label htmlFor="occasion">Occasion</label>
                    <select
                        id="occasion"
                        name="occasion"
                        {...formik.getFieldProps('occasion')}
                        {...errorProps('occasion')}
                    >
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                    </select>
                    {formik.touched.occasion && formik.errors.occasion && (
                        <span className="error" id="error-occasion" role="alert">{formik.errors.occasion}</span>
                    )}

                    <input className="btn" type="submit" value="Make Your reservation" disabled={formik.isSubmitting} />
                </form>
            </div>
        </main>
    );
};

export default BookingForm;
