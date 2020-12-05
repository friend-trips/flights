import React, { Component, useState } from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import styled, { ThemeProvider } from "styled-components";
import "./FlightForm.css";
import moment from "moment";

// import styles from './App.css';

var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: "GvdXBCW4a83r4vyr5i5ngrgxUX9XmTYG",
  clientSecret: "AtQCe6Bqh1OQOK5O",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 5%;
  height: 5%;
  border-style: solid;
  border-width: 3px;
  border-color: red;
  margin-bottom: 5%;
  margin-top: 2%;
`;

const StyledInput = styled.input`
  height: 43px;
  font-family: Montserrat, sans-serif;
  border-radius: 5px;
  font-weight: 500;
`;

const StyledSubmit = styled.input`
  border-width: 0px;
  border: none;
  background-color: #f7498e;
  color: #fff;
  height: 40px;
  width: auto;
  border-radius: 5px;
  font-family: "cerapro-bold", sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function FlightForm({ displaySearchFeed }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [seatClass, setSeatClass] = useState("ECONOMY");
  const [adults, setAdults] = useState("1");
  const [nonstop, setNonstop] = useState(true);
  const [focusedCalendar, setFocusedCalendar] = useState(null);
  const [flights, setFlights] = useState([]);

  // const [test, setTest] = useState(false);

  const setDates = (data) => {
    setStartDate(moment(data.startDate).format("YYYY-MM-DD"));
    setEndDate(moment(data.endDate).format("YYYY-MM-DD"));
  };
  const handleChange = (field, event) => {
    console.log("handlechange", field);
    switch (field) {
      case "from":
        return setFrom(event.target.value);
      case "to":
        return setTo(event.target.value);
      case "seatClass":
        return setSeatClass(event.target.value);
      case "adults":
        return setAdults(event.target.value);
      case "nonstop":
        return setNonstop(event.target.value);
      default:
        return;
    }
  };

  const handleCheck = () => {
    setNonstop(!nonstop);
  };

  let flightDictionary = {};

  const filterData = (array) => {
    function changeTime(timeString) {
      if (timeString.slice(0, 2) > 12) {
        let twelveHour = timeString.slice(0, 2) % 12;
        return twelveHour.toString().concat(timeString.slice(2)).concat(" PM");
      } else {
        return timeString.slice(1).concat(" AM");
      }
    }

    function formatDate(str) {
      let dateArr = str.split("-");
      dateArr = dateArr.map((date) => {
        let MDYArr = date.split("");
        if (MDYArr[0] === "0") MDYArr.shift();
        return MDYArr.join("");
      });
      return dateArr.join("-");
    }

    return array.map((result) => {
      let filteredResult = {
        id: result.id,
        bookableSeats: result.numberOfBookableSeats,
        totalPrice: result.price.grandTotal,

        outgoingDuration: `${result.itineraries[0].segments[0].duration
          .slice(2, 5)
          .toLowerCase()} ${result.itineraries[0].segments[0].duration
          .slice(5)
          .toLowerCase()}`,
        outgoingArrivalAirport:
          result.itineraries[0].segments[0].arrival.iataCode,
        outgoingArrivalTime: changeTime(
          result.itineraries[0].segments[0].arrival.at.slice(11, 16)
        ),
        // outgoingArrivalDate: result.itineraries[0].segments[0].arrival.at.slice(0, 10),
        outgoingDepartureAirport:
          result.itineraries[0].segments[0].departure.iataCode,
        outgoingDepartureTime: changeTime(
          result.itineraries[0].segments[0].departure.at.slice(11, 16)
        ),
        outgoingDepartureDate: formatDate(
          `${result.itineraries[0].segments[0].departure.at.slice(
            5,
            10
          )}-${result.itineraries[0].segments[0].departure.at.slice(0, 4)}`
        ),
        outgoingFlightNumber: result.itineraries[0].segments[0].number,
        outgoingNumberOfStops: result.itineraries[0].segments[0].numberOfStops,
        outgoingCarrierCode:
          flightDictionary[result.itineraries[0].segments[0].carrierCode],
        outgoingOperatingCarrierCode:
          result.itineraries[0].segments[0].operating.carrierCode,
        outgoingClass: result.travelerPricings[0].fareDetailsBySegment[0].cabin,

        returnDuration: `${result.itineraries[1].segments[0].duration
          .slice(2, 5)
          .toLowerCase()} ${result.itineraries[1].segments[0].duration
          .slice(5)
          .toLowerCase()}`,
        returnArrivalAirport:
          result.itineraries[1].segments[0].arrival.iataCode,
        returnArrivalTime: changeTime(
          result.itineraries[1].segments[0].arrival.at.slice(11, 16)
        ),
        // returnArrivalDate: result.itineraries[1].segments[0].arrival.at.slice(0, 10),
        returnDepartureAirport:
          result.itineraries[1].segments[0].departure.iataCode,
        returnDepartureTime: changeTime(
          result.itineraries[1].segments[0].departure.at.slice(11, 16)
        ),
        returnDepartureDate: formatDate(
          `${result.itineraries[1].segments[0].departure.at.slice(
            5,
            10
          )}-${result.itineraries[1].segments[0].departure.at.slice(0, 4)}`
        ),
        returnFlightNumber: result.itineraries[1].segments[0].number,
        returnNumberOfStops: result.itineraries[1].segments[0].numberOfStops,
        returnCarrierCode:
          flightDictionary[result.itineraries[1].segments[0].carrierCode],
        returnOperatingCarrierCode:
          result.itineraries[1].segments[0].operating.carrierCode,
        returnClass: result.travelerPricings[0].fareDetailsBySegment[1].cabin,
      };
      return filteredResult;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    amadeus.shopping.flightOffersSearch
      .get({
        originLocationCode: from,
        destinationLocationCode: to,
        departureDate: "2021-02-01",
        returnDate: "2021-02-07",
        adults: adults,
        travelClass: seatClass,
        nonStop: nonstop,
        // nonStop: false,
        currencyCode: "USD",
        max: 25,
      })
      .then(function (response) {
        console.log(response);
        flightDictionary = response.result.dictionaries.carriers;
        console.log("flightDictionary", flightDictionary);
        displaySearchFeed(filterData(response.data));
      })
      .catch(function (response) {
        console.error(response);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <label>
          <StyledInput
            type="text"
            placeholder="From"
            name="from"
            value={from}
            onChange={(e) => {
              handleChange("from", e);
            }}
          />
        </label>
        <label>
          <StyledInput
            type="text"
            placeholder="To"
            name="to"
            value={to}
            onChange={(e) => {
              handleChange("to", e);
            }}
          />
        </label>
        <DateRangeInput
          className="datePicker"
          onDatesChange={(data) => {
            setDates(data);
          }}
          onFocusChange={(focusedInput) => setFocusedCalendar(focusedInput)}
          startDate={startDate} // Date or null
          endDate={endDate} // Date or null
          focusedInput={focusedCalendar} // START_DATE, END_DATE or null
          style="border-width: 100px;"
        />
        <label>
          <select
            value={seatClass}
            name="seatClass"
            onChange={(e) => {
              handleChange("seatClass", e);
            }}
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </label>
        <label>
          Adults
          <select
            type="number"
            value={adults}
            name="adults"
            onChange={(e) => {
              handleChange("adults", e);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <label>Nonstop</label>
        <input
          type="checkbox"
          id="Nonstop"
          name="Nonstop"
          onChange={(e) => {
            handleChange("nonstop", e);
          }}
          defaultChecked={nonstop}
        />
        <StyledSubmit className="hi" type="submit" value="Search" />
      </Form>
    </Container>
  );
}

export default FlightForm;
