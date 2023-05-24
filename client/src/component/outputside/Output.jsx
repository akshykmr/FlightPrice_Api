import React from 'react'
import { FaPlaneDeparture, FaPlaneArrival, FaClock } from 'react-icons/fa';
import './Output.scss'
import logo from '../../assets/Vistara-Logo.wine.svg'

const Output = ({flightPrice}) => {
  const ticketData = {
    airline: 'Vistara',
    flightNumber: 'SG 123',
    origin: 'New York',
    destination: 'London',
    departureTime: '08:00 AM',
    arrivalTime: '03:30 PM',
    price: '4000'
  };
  return (
    <div className="flight-ticket">
    <div className="ticket-header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="airline-info">
        <span className="airline">{ticketData.airline}</span>
        <span className="flight-number">Flight {ticketData.flightNumber}</span>
      </div>
    </div>
    <div className="ticket-details">
      <div className="route">
        <div className="city">
          <FaPlaneDeparture />
          <span className="city-name">{ticketData.origin}</span>
        </div>
        <div className="arrow">
          <FaPlaneArrival />
        </div>
        <div className="city">
          <span className="city-name">{ticketData.destination}</span>
          <FaPlaneArrival />
        </div>
      </div>
      <div className="time">
        <div className="departure">
          <FaClock />
          <span className="time-label">Departure:</span>
          <span className="time-value">{ticketData.departureTime}</span>
        </div>
        <div className="arrival">
          <FaClock />
          <span className="time-label">Arrival:</span>
          <span className="time-value">{ticketData.arrivalTime}</span>
        </div>
      </div>
    </div>
    <div className="ticket-price">
      <span>Price:</span>
      {/* <span>{ticketData.price}</span> */}
      <span>{flightPrice}</span>
    </div>
  </div>

  )
}

export default Output
