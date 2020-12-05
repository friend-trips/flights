import React, { useState, useEffect } from "react";
import styled from "styled-components";

// this is the css for the grid code on bottom
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 25% 25% 25% 25%;
//   grid-template-columns: 33% 33% 33%;
//   border: solid 2px;
//   margin-bottom: 20px;
//   height: 150px;
//   width: 600px;
//   padding: 10px;
// `;
// const DepartingUpper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-around;
//   grid-row-start: 1;
//   grid-column-start: 1;
//   grid-column-end: 4;
// `;
// const DepartingLower = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-evenly;
//   grid-row-start: 2;
//   grid-column-start: 1;
//   grid-column-end: 4;
// `;
// const ReturningUpper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-evenly;
//   grid-row-start: 3;
//   grid-column-start: 1;
//   grid-column-end: 4;
// `;
// const ReturningLower = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-evenly;
//   grid-row-start: 4;
//   grid-column-start: 1;
//   grid-column-end: 4;
// `;
// const Direction = styled.h1``;
// const FlightNumber = styled.span``;
// const Date = styled.span`
// `;
// const Duration = styled.span``;
// const Time = styled.span``;
// const Airport = styled.span``;
// const CarrierCode = styled.span``;
// const Class = styled.span``;
// const Departing = styled.div`
//   padding-bottom: 10px;
//   width: 100%;
//   height: 50%;
// `;


// this is the container for the div experiment
const Container = styled.div`
  display: block;
  border: solid 2px;
  margin-bottom: 20px;
  height: 150px;
  width: 100%;
  padding: 10px;
`;
const Direction = styled.h1``;
const FlightNumber = styled.span``;
const Date = styled.span`
`;
const Duration = styled.span``;
const Time = styled.span``;
const Airport = styled.span``;
const CarrierCode = styled.span``;
const Class = styled.span``;
const Departing = styled.div`
  display: block;
  padding-bottom: 10px;
  width: 100%;
  height: 50%;
`;
const Returning = styled.div`
  width: 100%;
  height: 50%;
`;
const DateAndCarrier = styled.div`
  height: 100%;
  width: 30%;
  float: left;
  display: grid;
  grid-template-rows: 50% 50%;
`;
const DurationAndAirports = styled.div`
  height: 100%;
  width: 30%;
  float: right;
  display: grid;
  grid-template-rows: 50% 50%;
`;

const Flights = ({ data }) => {
  return (
    <Container>
      <Departing>
        <DateAndCarrier>
          <Date>{data.outgoingDepartureDate}</Date>
          <CarrierCode>{data.outgoingCarrierCode} {data.outgoingFlightNumber}</CarrierCode>
        </DateAndCarrier>
        <Time>
          {data.outgoingDepartureTime} - {data.outgoingArrivalTime}
        </Time>
        <DurationAndAirports>
          <Duration>{data.outgoingDuration}</Duration>
          <Airport>
            {data.outgoingDepartureAirport} - {data.outgoingArrivalAirport}
          </Airport>
        </DurationAndAirports>
      </Departing>
      <Returning>
        <DateAndCarrier>
          <Date>{data.returnDepartureDate}</Date>
          <CarrierCode>{data.returnCarrierCode} {data.returnFlightNumber}</CarrierCode>
        </DateAndCarrier>
        <Time>
          {data.returnDepartureTime} - {data.returnArrivalTime}
        </Time>
        <DurationAndAirports>
          <Duration>{data.returnDuration}</Duration>
          <Airport>
            {data.returnDepartureAirport} - {data.returnArrivalAirport}
          </Airport>
        </DurationAndAirports>
      </Returning>
    </Container>


    // <Container>
    //   <DepartingUpper>
    //     {/* <Direction>Departing</Direction> */}
    //     <Date>{data.outgoingDepartureDate}</Date>
    //     <Time>
    //       {data.outgoingDepartureTime} - {data.outgoingArrivalTime}
    //     </Time>
    //     <Duration>{data.outgoingDuration}</Duration>
    //     {/* <Class>{data.outgoingClass}</Class> */}
    //   </DepartingUpper>
    //   <DepartingLower>
    //     <CarrierCode>{data.outgoingCarrierCode}</CarrierCode>
    //     <FlightNumber>{data.outgoingFlightNumber}</FlightNumber>
    //     <Airport>
    //       {data.outgoingDepartureAirport} - {data.outgoingArrivalAirport}
    //     </Airport>
    //   </DepartingLower>
    //   <ReturningUpper>
    //     {/* <Direction>Returning</Direction> */}
    //     <Date>{data.returnDepartureDate}</Date>
    //     <Time>
    //       {data.returnDepartureTime} - {data.returnArrivalTime}
    //     </Time>
    //     <Duration>{data.returnDuration}</Duration>
    //     {/* <Class>{data.returnClass}</Class> */}
    //   </ReturningUpper>
    //   <ReturningLower>
    //     <CarrierCode>{data.returnCarrierCode}</CarrierCode>
    //     <FlightNumber>{data.returnFlightNumber}</FlightNumber>
    //     <Airport>
    //       {data.returnDepartureAirport} - {data.returnArrivalAirport}
    //     </Airport>
    //   </ReturningLower>
    // </Container>
  );
};

export default Flights;