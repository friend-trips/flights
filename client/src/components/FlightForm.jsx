import React, { Component, useState} from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import styled, { ThemeProvider } from "styled-components";
import moment from 'moment';

// import styles from './App.css';

var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: 'GvdXBCW4a83r4vyr5i5ngrgxUX9XmTYG',
  clientSecret: 'AtQCe6Bqh1OQOK5O'
});

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
`;


function FlightForm({displaySearchFeed}) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [seatClass, setSeatClass] = useState('ECONOMY')
  const [adults, setAdults] = useState('1');
  const [nonstop, setNonstop] = useState(true)
  const [focusedCalendar, setFocusedCalendar] = useState(null);
  const [flights, setFlights] =  useState([])


  // const [test, setTest] = useState(false);

  const setDates = (data) => {
    setStartDate(moment(data.startDate).format("YYYY-MM-DD"));
    setEndDate(moment(data.endDate).format("YYYY-MM-DD"))
  }
  const handleChange = (field, event) => {
    console.log('handlechange', field);
    switch (field) {
      case 'from':
        return setFrom(event.target.value)
      case 'to':
        return setTo(event.target.value)
      case 'seatClass':
        return setSeatClass(event.target.value)
      case 'adults':
        return setAdults(event.target.value)
      case 'nonstop':
        return setNonstop(event.target.value)
      default:
        return;
    }
  }

  const handleCheck = () => {
    setNonstop(!nonstop)
  }

  const filterData = (array) => {
    return array.map(result => {
      let filteredResult = {
        id: result.id,
        bookableSeats: result.numberOfBookableSeats,
        totalPrice: result.price.grandTotal,

        outgoingDuration: result.itineraries[0].segments[0].duration.slice(2),
        outgoingArrivalAirport: result.itineraries[0].segments[0].arrival.iataCode,
        outgoingArrivalTime: result.itineraries[0].segments[0].arrival.at.slice(11),
        outgoingArrivalDate: result.itineraries[0].segments[0].arrival.at.slice(0, 10),
        outgoingDepartureAirport: result.itineraries[0].segments[0].departure.iataCode,
        outgoingDepartureTime: result.itineraries[0].segments[0].departure.at.slice(11),
        outgoingDepartureDate: result.itineraries[0].segments[0].departure.at.slice(0, 10),
        outgoingFlightNumber: result.itineraries[0].segments[0].number,
        outgoingNumberOfStops: result.itineraries[0].segments[0].numberOfStops,
        outgoingCarrierCode: result.itineraries[0].segments[0].carrierCode,
        outgoingOperatingCarrierCode: result.itineraries[0].segments[0].operating.carrierCode,
        outgoingClass: result.travelerPricings[0].fareDetailsBySegment[0].cabin,

        returnDuration: result.itineraries[1].segments[0].duration.slice(2),
        returnArrivalAirport: result.itineraries[1].segments[0].arrival.iataCode,
        returnArrivalTime: result.itineraries[1].segments[0].arrival.at.slice(11),
        returnArrivalDate: result.itineraries[1].segments[0].arrival.at.slice(0, 10),
        returnDepartureAirport: result.itineraries[1].segments[0].departure.iataCode,
        returnDepartureTime: result.itineraries[1].segments[0].departure.at.slice(11),
        returnDepartureDate: result.itineraries[1].segments[0].departure.at.slice(0, 10),
        returnFlightNumber: result.itineraries[1].segments[0].number,
        returnNumberOfStops: result.itineraries[1].segments[0].numberOfStops,
        returnCarrierCode: result.itineraries[1].segments[0].carrierCode,
        returnOperatingCarrierCode: result.itineraries[1].segments[0].operating.carrierCode,
        returnClass: result.travelerPricings[0].fareDetailsBySegment[1].cabin
      };
      return filteredResult;
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const displaySearchFeed = displaySearchFeed;
    const filterData = filterData;

    amadeus.shopping.flightOffersSearch.get({
      originLocationCode: from,
      destinationLocationCode: to,
      departureDate: startDate,
      returnDate: endDate,
      adults: adults,
      travelClass: seatClass,
      nonStop: nonstop,
      currencyCode: 'USD',
      max: 25
    })
    .then(function (response) {
      console.log(response.data);
      displaySearchFeed(filterData(response.data));
    })
    .catch(function (response) {
      console.error(response);
    });
  }


  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      <label>
        <input type="text" placeholder="From" name="from" value={from} onChange={(e) => {handleChange("from", e)}}/>
      </label>
      <label>
        <input type="text" placeholder="To" name="to" value={to} onChange={(e) => {handleChange("to", e)}} />
      </label>
      <ThemeProvider
      theme={{
        breakpoints: ["32em", "48em", "64em"],
        reactDatepicker: {
          daySize: [36, 40],
          fontFamily: "system-ui, -apple-system",
          colors: {
            accessibility: "#D80249",
            selectedDay: "#f7518b",
            selectedDayHover: "#F75D95",
            primaryColor: "#d8366f"
          }
        }
      }}
    >
      <DateRangeInput
        onDatesChange={data => {setDates(data)}}

        onFocusChange={focusedInput =>setFocusedCalendar(focusedInput)}
        startDate={startDate} // Date or null
        endDate={endDate} // Date or null
        focusedInput={focusedCalendar} // START_DATE, END_DATE or null
      />
      </ThemeProvider>
      <label>
        <select value={seatClass} name="seatClass" onChange={(e) => {handleChange("seatClass", e)}}>
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First</option>
        </select>
      </label>
      <label>
        Adults
        <select type="number" value={adults} name="adults" onChange={(e) => {handleChange("adults", e)}}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </label>
      <label>Nonstop</label>
      <input type="checkbox" id="Nonstop" name="Nonstop" onChange={(e) => {handleChange("nonstop", e)}} defaultChecked={nonstop}/>
      <input type="submit" value="Find flights" />
    </Form>
    </Container>
  )
}

export default FlightForm;