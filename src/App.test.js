import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "./components/booking-ui/BookingForm";
import { updateTimes, initializeTimes } from './App';

const availableTimes = ["17:00", "18:00", "19:00"];
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

const renderForm = (props = {}) => {
    // window.fetchAPI is used by the date onChange and by App's initial times
    window.fetchAPI = jest.fn().mockReturnValue(availableTimes);
    return render(
        <BookingForm
            availableTimes={availableTimes}
            dispatch={mockDispatch}
            submitForm={mockSubmitForm}
            {...props}
        />
    );
};

beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
});

// window.fetchAPI is only provided by renderForm(); restore the original
// (jsdom) state so tests like initializeTimes below see a clean window
afterEach(() => {
    delete window.fetchAPI;
});

test('Renders the BookingForm heading', () => {
    renderForm();
    const headingElement = screen.getByText("Make Your reservation");
    expect(headingElement).toBeInTheDocument();
});

describe('Times Reducer & Initializer', () => {

    test('initializeTimes returns the correct expected value', () => {
        const times = initializeTimes();
        expect(Array.isArray(times)).toBe(true);
    });

    test('updateTimes returns the same state when given an unknown action', () => {
        const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        const action = { type: "SOME_OTHER_ACTION" };
        
        const newState = updateTimes(initialState, action);
        expect(newState).toEqual(initialState);
    });

    test('updateTimes returns the updated state when given the action to update times', () => {
        const initialState = ["17:00", "18:00"];
        const action = { type: "SET_TIMES", payload: ["19:00", "20:00", "21:00"] };
        
        const newState = updateTimes(initialState, action);
        
        expect(newState).toEqual(["19:00", "20:00", "21:00"]); 
    });

});

describe("Input field attributes", () => {
    test("date input has the correct type, id, name and is empty by default", () => {
        renderForm();
        const dateInput = screen.getByLabelText("Choose date");
        expect(dateInput).toHaveAttribute("type", "date");
        expect(dateInput).toHaveAttribute("id", "date");
        expect(dateInput).toHaveAttribute("name", "date");
        expect(dateInput).toHaveValue("");
    });

    test("time select has the correct id, name, a disabled placeholder and the available time options", () => {
        renderForm();
        const timeSelect = screen.getByLabelText("Choose time");
        expect(timeSelect).toHaveAttribute("id", "time");
        expect(timeSelect).toHaveAttribute("name", "time");
        expect(timeSelect.querySelectorAll("option")).toHaveLength(availableTimes.length + 1);
        expect(timeSelect).toHaveValue("");

        const placeholder = timeSelect.querySelector("option[value='']");
        expect(placeholder).toBeDisabled();
        expect(placeholder).toHaveTextContent("Select a time");

        availableTimes.forEach((time) => {
            expect(screen.getByRole("option", { name: time })).toHaveValue(time);
        });
    });

    test("guests input has the correct type, id, min, max, placeholder and default value", () => {
        renderForm();
        const guestsInput = screen.getByLabelText("Number of guests");
        expect(guestsInput).toHaveAttribute("type", "number");
        expect(guestsInput).toHaveAttribute("id", "guests");
        expect(guestsInput).toHaveAttribute("min", "1");
        expect(guestsInput).toHaveAttribute("max", "10");
        expect(guestsInput).toHaveAttribute("placeholder", "1");
        expect(guestsInput).toHaveValue(1);
    });

    test("occasion select has the correct id, options and default value", () => {
        renderForm();
        const occasionSelect = screen.getByLabelText("Occasion");
        expect(occasionSelect).toHaveAttribute("id", "occasion");
        expect(occasionSelect).toHaveValue("Birthday");
        expect(occasionSelect.querySelectorAll("option")).toHaveLength(2);
        expect(screen.getByRole("option", { name: "Birthday" })).toHaveValue("Birthday");
        expect(screen.getByRole("option", { name: "Anniversary" })).toHaveValue("Anniversary");
    });

    test("submit button has the right type and is enabled by default", () => {
        renderForm();
        const submitButton = screen.getByRole("button", { name: "Make Your reservation" });
        expect(submitButton).toHaveAttribute("type", "submit");
        expect(submitButton).not.toBeDisabled();
    });
});

describe("Valid form submission", () => {
    const fillValidForm = async () => {
        // fireEvent.change works reliably for <input type="date"> in jsdom
        fireEvent.change(screen.getByLabelText("Choose date"), {
            target: { value: "2026-10-30" },
        });
        userEvent.selectOptions(screen.getByLabelText("Choose time"), "18:00");
        userEvent.clear(screen.getByLabelText("Number of guests"));
        userEvent.type(screen.getByLabelText("Number of guests"), "4");
        userEvent.selectOptions(screen.getByLabelText("Occasion"), "Anniversary");
    };

    test("calls submitForm with the entered values when all fields are valid", async () => {
        renderForm();
        await fillValidForm();

        fireEvent.click(screen.getByRole("button", { name: "Make Your reservation" }));

        await waitFor(() => {
            expect(mockSubmitForm).toHaveBeenCalledTimes(1);
        });
        expect(mockSubmitForm).toHaveBeenCalledWith({
            date: "2026-10-30",
            time: "18:00",
            guests: 4, // Formik coerces the number input value to a number
            occasion: "Anniversary",
        });
    });

    test("does not show any validation errors when the form is valid", async () => {
        renderForm();
        await fillValidForm();

        fireEvent.click(screen.getByRole("button", { name: "Make Your reservation" }));

        // Wait for Formik to finish validating (valid forms reach the submit handler)
        await waitFor(() => {
            expect(mockSubmitForm).toHaveBeenCalledTimes(1);
        });

        // Formik marks every field touched on submit; none of them may be an error
        const dateInput = screen.getByLabelText("Choose date");
        fireEvent.blur(dateInput);
        const timeSelect = screen.getByLabelText("Choose time");
        fireEvent.blur(timeSelect);
        const guestsInput = screen.getByLabelText("Number of guests");
        fireEvent.blur(guestsInput);
        const occasionSelect = screen.getByLabelText("Occasion");
        fireEvent.blur(occasionSelect);

        expect(screen.queryByText("Date is required")).not.toBeInTheDocument();
        expect(screen.queryByText("Please select a time slot")).not.toBeInTheDocument();
        expect(screen.queryByText("Number Of Guests is required")).not.toBeInTheDocument();
        expect(screen.queryByText("Please select an occasion")).not.toBeInTheDocument();
        expect(screen.queryAllByText("Invalid time slot selected")).toHaveLength(0);
        expect(screen.queryAllByText("Invalid occasion selected")).toHaveLength(0);
    });

    test("dispatches SET_TIMES with the times from window.fetchAPI when the date changes", () => {
        renderForm();

        fireEvent.change(screen.getByLabelText("Choose date"), {
            target: { value: "2026-10-30" },
        });

        expect(window.fetchAPI).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SET_TIMES",
            payload: availableTimes,
        });
    });
});

describe("Invalid form states", () => {
    test("showing required errors and not calling submitForm when submitting an empty form", async () => {
        renderForm();

        fireEvent.submit(screen.getByRole("button", { name: "Make Your reservation" }).closest("form"));

        await waitFor(() => {
            expect(screen.getByText("Date is required")).toBeInTheDocument();
        });
        expect(mockSubmitForm).not.toHaveBeenCalled();
        expect(screen.getByText("Date is required")).toBeInTheDocument();
        expect(screen.getByText("Please select a time slot")).toBeInTheDocument();
        // guests (1) and occasion (Birthday) have valid initial values, so no errors for them
        expect(screen.queryByText("Number Of Guests is required")).not.toBeInTheDocument();
        expect(screen.queryByText("Please select an occasion")).not.toBeInTheDocument();
    });

    test("shows a minimum error when the number of guests is less than 1", async () => {
        renderForm();

        const guestsInput = screen.getByLabelText("Number of guests");
        userEvent.clear(guestsInput);
        userEvent.type(guestsInput, "0");
        fireEvent.blur(guestsInput);

        fireEvent.submit(screen.getByRole("button", { name: "Make Your reservation" }).closest("form"));

        await waitFor(() => {
            expect(screen.getByText("Guests Can't be less than 1")).toBeInTheDocument();
        });
        expect(mockSubmitForm).not.toHaveBeenCalled();
    });

    test("shows a whole-number error when the number of guests is not an integer", async () => {
        renderForm();

        const guestsInput = screen.getByLabelText("Number of guests");
        userEvent.clear(guestsInput);
        // Enter a value over 1 so the .min check passes and .integer is what fails
        userEvent.type(guestsInput, "1.5");

        fireEvent.submit(screen.getByRole("button", { name: "Make Your reservation" }).closest("form"));

        await waitFor(() => {
            expect(screen.getByText("Guests must be a whole number")).toBeInTheDocument();
        });
        expect(mockSubmitForm).not.toHaveBeenCalled();
    });

    test("clears the selected time when it is no longer in the available times after a date change", async () => {
        const timesAfterDateChange = ["19:00", "20:00"];
        const { rerender } = renderForm();

        // Select a time that will not be offered by the newly selected date
        userEvent.selectOptions(screen.getByLabelText("Choose time"), "17:00");
        expect(screen.getByLabelText("Choose time")).toHaveValue("17:00");

        // Simulate picking a date whose available times no longer include "17:00"
        window.fetchAPI.mockReturnValue(timesAfterDateChange);
        rerender(
            <BookingForm
                availableTimes={timesAfterDateChange}
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
            />
        );

        expect(screen.getByLabelText("Choose time")).toHaveValue("");
    });
});