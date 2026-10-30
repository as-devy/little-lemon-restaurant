import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import BookingPage from './components/pages/BookingPage';
import ConfirmedBooking from './components/pages/ConfirmedBooking';
import { useEffect, useReducer, useState } from 'react';

export const updateTimes = (state, action) => {
  switch (action.type) {
    case "SET_TIMES":
      return action.payload;
    default:
      return state;
  }
};

export const initializeTimes = () => {
  return window.fetchAPI ? window.fetchAPI(new Date()) : [];
};



function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const [formSubmited, setFormSubmited] = useState(false)
  const navigate = useNavigate();

  const submitForm = (formData) => {
    return window.submitAPI ? setFormSubmited(window.submitAPI) : false;
  }

  useEffect(() => {
    if (formSubmited) {
      navigate("/confirm-booking")
    }
  }, [formSubmited])

  return (
    <div className='page-layout'>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />}></Route>
        <Route path="/confirm-booking" element={<ConfirmedBooking />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

