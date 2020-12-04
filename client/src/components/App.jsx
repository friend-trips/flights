import React from "react";
import Form from './Form.jsx';
import SearchResults from './SearchResults.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    }

    this.displaySearchFeed = this.displaySearchFeed.bind(this);
  }

  displaySearchFeed(data) {
    this.setState({
      searchResults: data
    })
  }

  render() {
    return (
      <div>
        <Form displaySearchFeed={this.displaySearchFeed}/>
        {this.state.searchResults.length > 0 ? <SearchResults searchResults={this.state.searchResults}/> : null}
      </div>
    )
  }
}

export default App;
