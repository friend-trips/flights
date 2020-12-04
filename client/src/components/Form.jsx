import React from 'react';

var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: 'GvdXBCW4a83r4vyr5i5ngrgxUX9XmTYG',
  clientSecret: 'AtQCe6Bqh1OQOK5O'
});

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
      depart: '',
      arrive: '',
      class: 'ECONOMY',
      adults: '1',
      nonstop: true,
      flights: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheck() {
    this.setState({
      nonstop: !this.state.nonstop
    })
  }

  filterData(array) {
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

  handleSubmit(event) {
    event.preventDefault();

    const displaySearchFeed = this.props.displaySearchFeed;
    const filterData = this.filterData;

    amadeus.shopping.flightOffersSearch.get({
      originLocationCode: this.state.from,
      destinationLocationCode: this.state.to,
      departureDate: '2021-02-01',
      returnDate: '2021-02-07',
      adults: this.state.adults,
      travelClass: this.state.class,
      nonStop: this.state.nonstop,
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

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" placeholder="From" name="from" value={this.state.from} onChange={this.handleChange} />
        </label>
        <label>
          <input type="text" placeholder="To" name="to" value={this.state.to} onChange={this.handleChange} />
        </label>
        <label>
          <input type="text" placeholder="Depart Date" name="depart" value={this.state.depart} onChange={this.handleChange} />
        </label>
        <label>
          <input type="text" placeholder="Return Date" name="arrive" value={this.state.arrive} onChange={this.handleChange} />
        </label>
        <label>
          <select value={this.state.class} name="class" onChange={this.handleChange}>
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </label>
        <label>
          Adults
          <select type="number" value={this.state.adults} name="adults" onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <label>Nonstop</label>
        <input type="checkbox" id="Nonstop" name="Nonstop" onChange={this.handleCheck} defaultChecked={this.state.nonstop}/>
        <input type="submit" value="Find flights" />
      </form>
    )
  }
}

export default Form;