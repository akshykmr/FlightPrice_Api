import { useState, useEffect } from 'react';
import axios from 'axios';
import './Input.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import Output from '../outputside/Output';

const cities = [
  { city: 'Mumbai' },
  { city: 'Delhi' },
  { city: 'Bangalore' },
  { city: 'Kolkata' },
  { city: 'Chennai' },
  { city: 'Hyderabad' },
  { city: 'Ahmedabad' },
  { city: 'Pune' },
  { city: 'Jaipur' },
  { city: 'Lucknow' }
];

const Input = () => {

 const [selectedDate, setSelectedDate] = useState(null);
 const [source, setSource] = useState('');
 const [destination, setDestination] = useState('');
 const [flightPrice, setFlightPrice] = useState('');
 const [isLoading, setIsLoading] = useState(false);

 const handleDateChange = (event) => {
  setSelectedDate(event.target.value);
};

 const handleSourceChange = (e) => {
    setSource(e.target.value);
    if (e.target.value === destination) {
      setDestination('');
    }
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    if (e.target.value === source) {
      setSource('');
    }
  };

  const handleInterchange = () => {
    setSource(destination);
    setDestination(source);
  };

  const destinationOptions = cities.filter((city) => city.city !== source);

  const isDateOutOfRange = (date) => {
    const startDate = new Date(2023, 4, 1);  // May 1st, 2023
    const endDate = new Date(2023, 4, 30); // May 30th, 2023
  
    // Convert the selected date to a Date object for comparison
    const selectedDate = new Date(date);
  
    return selectedDate < startDate || selectedDate > endDate;
  };
  
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/flights');
      const flights = response.data;
  
      // Find the flight that matches the selected date
      const matchingFlight = flights.find((flight) => {
        return (
          flight.date === selectedDate &&
          flight.source === source &&
         flight.destination === destination
        );
      });
  
      if (matchingFlight && matchingFlight.source === source && matchingFlight.destination === destination) {
        setFlightPrice(matchingFlight.price);
      } else {
        setFlightPrice('No matching flights found');
      }
    } catch (error) {
      console.log('Error:', error);
      // Handle the error condition
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    setFlightPrice('');
  }, [source, destination]);

  return (
    <>
      <div className="input-area">
        <div className="content-box">
          <h4>Search Flight</h4>
          <div className="inputs">
            <div class="input-group1">
              <label className="input-group-text1" htmlFor="sourceSelect">
                Source
              </label>
              <select className="form-select1" id="sourceSelect" value={source} onChange={handleSourceChange}>
                <option  value="" disabled selected>
                  Choose...
                </option>
                  {cities.map((city, index) => (
                    <option key={index} value={city.city} className="custom-option1">
                      {city.city}
                    </option> ))
                  }
              </select>
            </div>
            <button className='exchange-btn' onClick={handleInterchange}><CgArrowsExchangeAltV/></button>
            <div class="input-group1">
              <label className="input-group-text1" htmlFor="destinationSelect">
                Destination
              </label>
              <select className="form-select1" id="destinationSelect"  value={destination} onChange={handleDestinationChange}>
                <option value="" disabled selected>
                  Choose...
                </option>
                {destinationOptions.map((city, index) => (
                  <option key={index} value={city.city} className="custom-option1">
                    {city.city}
                  </option> ))
                }
               </select> 
            </div>
            <div className="datepicker-container"> 
              {selectedDate && isDateOutOfRange(selectedDate) && (
                <p style={{ color: 'red' }}>NOTE: Please select a date between 1 May and 30 May.</p> )
              }
              <input type="date" value={selectedDate} onChange={handleDateChange} min="2023-01-01" max="2023-12-31" />
            </div>
            <button className="search-btn" onClick={handleSearch}>
            {isLoading ? 'Loading...' : 'Search'}
          </button>
          </div>
          <div className="output">
          <Output source={source} destination={destination} flightPrice={isLoading ? 'Loading...' : flightPrice}selectedDate={selectedDate} />
          </div>
        </div>
      </div> 
    </>
  )
}

export default Input
