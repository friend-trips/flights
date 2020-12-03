import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
      depart: '',
      arrive: '',
      class: 'Economy',
      adults: 1,
      nonstop: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
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
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business or First">Business or First</option>
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
          <label for="Nonstop">Nonstop</label>
          <input type="checkbox" id="Nonstop" name="Nonstop" onChange={this.handleCheck} defaultChecked={this.state.nonstop}/>
          <input type="submit" value="Find flights" />
        </form>
    )
  }
}

export default Form;