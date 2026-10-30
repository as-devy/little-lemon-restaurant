import { render, screen } from "@testing-library/react";
import BookingForm from "./components/booking-ui/BookingForm";
import { updateTimes, initializeTimes } from './App';

test('Renders the BookingForm heading', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    const headingElement = screen.getByText("Make Your reservation");
    expect(headingElement).toBeInTheDocument();
})

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