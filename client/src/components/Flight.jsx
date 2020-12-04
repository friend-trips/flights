import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 2px;
  margin-bottom: 20px;
`;
const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
const Direction = styled.h1``;
const FlightNumber = styled.span``;
const Date = styled.span``;
const Duration = styled.span``;
const Time = styled.span``;
const Airport = styled.span``;
const CarrierCode = styled.span``;
const Class = styled.span``;

const Flights = ({ data }) => {
  return (
    <Container>
      <Header>
        <Direction>Departing</Direction>
        <Date>{data.outgoingDepartureDate}</Date>
        <Time>
          {data.outgoingDepartureTime} - {data.outgoingArrivalTime}
        </Time>
        <Duration>{data.outgoingDuration}</Duration>
        <Airport>
          {data.outgoingDepartureAirport} - {data.outgoingArrivalAirport}
        </Airport>
        <FlightNumber>{data.outgoingFlightNumber}</FlightNumber>
        <CarrierCode>{data.outgoingCarrierCode}</CarrierCode>
        <Class>{data.outgoingClass}</Class>
      </Header>
      <Header>
        <Direction>Returning</Direction>
        <Date>{data.returnDepartureDate}</Date>
        <Time>
          {data.returnDepartureTime} - {data.returnArrivalTime}
        </Time>
        <Duration>{data.returnDuration}</Duration>
        <Airport>
          {data.returnDepartureAirport} - {data.returnArrivalAirport}
        </Airport>
        <FlightNumber>{data.returnFlightNumber}</FlightNumber>
        <CarrierCode>{data.returnCarrierCode}</CarrierCode>
        <Class>{data.returnClass}</Class>
      </Header>
    </Container>
  );
};

export default Flights;