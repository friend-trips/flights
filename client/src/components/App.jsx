import React from "react";
import FlightForm from "./FlightForm.jsx";
import SearchResults from "./SearchResults.jsx";
import Suggestions from "./Suggestions.jsx";
import styled from "styled-components";
import axios from 'axios';

//entire screen
const Container = styled.div`
  position: absolute;
  height: 99%;
  width: 99%;
  padding: .5%;
`
const Content = styled.div`
  border: solid 3px;
  display: flex;
  height: 89%;
  justify-content: space-between;
`;
//^^ height will control size of the bottom section
// form height and content should add up to equal 1--%

const PreSearchResults = styled.div`
  border: solid 1px;
  height: 100%;
  width: 66%;
  float: left;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      savedResults: [],
    };

    this.displaySearchFeed = this.displaySearchFeed.bind(this);
    this.getSavedResults = this.getSavedResults.bind(this);
  }

  displaySearchFeed(data) {
    this.setState({
      searchResults: data,
    });
  }


   getSavedResults() {
    axios.get("http://morning-bayou-59969.herokuapp.com/flights/?trip_id=1")
    // axios({
    //   method: 'get',
    //   url: 'http://morning-bayou-59969.herokuapp.com/flights',
    //   data: {trip_id: 1},
    //   // header: {'Access-Control-Allow-Origin': '*'}
    // })
      .then((data) => {
        let savedArray = [];
        console.log(data, "data.data")
        for (let keys in data.data) {
          savedArray.push(data.data[keys])
        }
        console.log("savedArray", savedArray);
        this.setState({savedResults: savedArray })
      })
      .catch(console.log)
    // axoios.get("http://morning-bayou-59969.herokuapp.com/flights")
    // .then((response) => {
    //   this.setState({savedResults: response.data })
    // })
    // .catch((err) => {
    //   console.log(err, "error getting response from data")
    // })
  }
//   axios({
//     method: 'get',
//     url: 'http://morning-bayou-59969.herokuapp.com/flights',
//     data: {"trip_id": 1},
//     header: {'Access-Control-Allow-Origin': '*'}
//   })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch(console.log)
// }


  componentDidMount() {
    this.getSavedResults();
  }

  render() {
    return (
      <Container>
        <FlightForm displaySearchFeed={this.displaySearchFeed} />
        <Content>
          {this.state.searchResults.length > 0 ? (
            <SearchResults searchResults={this.state.searchResults} />
          ) : <PreSearchResults />}
          <Suggestions savedResults={this.state.savedResults} />
        </Content>
      </Container>
    );
  }
}

export default App;
