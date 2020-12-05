import React, { Component, useState} from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import styled, { ThemeProvider } from "styled-components";
import moment from 'moment';
import keys from '../../../config.js';

// import styles from './App.css';

var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: keys.clientId,
  clientSecret: keys.clientSecret
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 5%;
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

  let flightDictionary = {};

  const filterData = (array) => {
    function changeTime(timeString) {
      if (timeString.slice(0, 2) > 12) {
        let twelveHour = timeString.slice(0, 2) % 12;
        return twelveHour.toString().concat(timeString.slice(2)).concat(' PM');
      } else if (timeString[0] === '0') {
        return timeString.slice(1).concat(' AM');
      } else {
        return timeString.concat(' AM');
      }
    }

    function formatDate(str) {
      let dateArr = str.split("-");
      dateArr = dateArr.map((date) => {
        let MDYArr = date.split("");
        if (MDYArr[0] === "0") MDYArr.shift();
        return MDYArr.join("")
      });
      return dateArr.join("-");
    }

    return array.map(result => {
      let filteredResult = {
        id: result.id,
        bookableSeats: result.numberOfBookableSeats,
        totalPrice: result.price.grandTotal,

        outgoingDuration: `${result.itineraries[0].segments[0].duration.slice(2, 5).toLowerCase()} ${result.itineraries[0].segments[0].duration.slice(5).toLowerCase()}`,
        outgoingArrivalAirport: result.itineraries[0].segments[0].arrival.iataCode,
        outgoingArrivalTime: changeTime(result.itineraries[0].segments[0].arrival.at.slice(11, 16)),
        // outgoingArrivalDate: result.itineraries[0].segments[0].arrival.at.slice(0, 10),
        outgoingDepartureAirport: result.itineraries[0].segments[0].departure.iataCode,
        outgoingDepartureTime: changeTime(result.itineraries[0].segments[0].departure.at.slice(11, 16)),
        outgoingDepartureDate: formatDate(`${result.itineraries[0].segments[0].departure.at.slice(5, 10)}-${result.itineraries[0].segments[0].departure.at.slice(0, 4)}`),
        outgoingFlightNumber: result.itineraries[0].segments[0].number,
        outgoingNumberOfStops: result.itineraries[0].segments[0].numberOfStops,
        outgoingCarrierCode: flightDictionary[result.itineraries[0].segments[0].carrierCode],
        outgoingOperatingCarrierCode: result.itineraries[0].segments[0].operating.carrierCode,
        outgoingClass: result.travelerPricings[0].fareDetailsBySegment[0].cabin,

        returnDuration: `${result.itineraries[1].segments[0].duration.slice(2, 5).toLowerCase()} ${result.itineraries[1].segments[0].duration.slice(5).toLowerCase()}`,
        returnArrivalAirport: result.itineraries[1].segments[0].arrival.iataCode,
        returnArrivalTime: changeTime(result.itineraries[1].segments[0].arrival.at.slice(11, 16)),
        // returnArrivalDate: result.itineraries[1].segments[0].arrival.at.slice(0, 10),
        returnDepartureAirport: result.itineraries[1].segments[0].departure.iataCode,
        returnDepartureTime: changeTime(result.itineraries[1].segments[0].departure.at.slice(11, 16)),
        returnDepartureDate: formatDate(`${result.itineraries[1].segments[0].departure.at.slice(5, 10)}-${result.itineraries[1].segments[0].departure.at.slice(0, 4)}`),
        returnFlightNumber: result.itineraries[1].segments[0].number,
        returnNumberOfStops: result.itineraries[1].segments[0].numberOfStops,
        returnCarrierCode: flightDictionary[result.itineraries[1].segments[0].carrierCode],
        returnOperatingCarrierCode: result.itineraries[1].segments[0].operating.carrierCode,
        returnClass: result.travelerPricings[0].fareDetailsBySegment[1].cabin
      };
      return filteredResult;
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    amadeus.shopping.flightOffersSearch.get({
      originLocationCode: from,
      destinationLocationCode: to,
      departureDate: '2021-02-01',
      returnDate: '2021-02-07',
      adults: adults,
      travelClass: seatClass,
      nonStop: nonstop,
      // nonStop: false,
      currencyCode: 'USD',
      max: 25
    })
    .then(function (response) {
      console.log(response);
      flightDictionary = response.result.dictionaries.carriers;
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