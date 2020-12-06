import React from "react";
import FlightForm from "./FlightForm.jsx";
import SearchResults from "./SearchResults.jsx";
import Suggestions from "./Suggestions.jsx";
import styled from "styled-components";

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
    };

    this.displaySearchFeed = this.displaySearchFeed.bind(this);
  }

  displaySearchFeed(data) {
    this.setState({
      searchResults: data,
    });
  }

  render() {
    return (
      <Container>
        <FlightForm displaySearchFeed={this.displaySearchFeed} />
        <Content>
          {this.state.searchResults.length > 0 ? (
            <SearchResults searchResults={this.state.searchResults} />
          ) : <PreSearchResults />}
          {this.state.searchResults.length > 0 ? (
            <Suggestions searchResults={this.state.searchResults} />
          ) : <PreSearchResults />}
        </Content>
      </Container>
    );
  }
}

export default App;
