import React from "react";
import Form from './Form.jsx';

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
      <Form displaySearchFeed={this.displaySearchFeed}/>
    )
  }
}

export default App;
