import React from 'react';
import Flight from './Flight.jsx'

const SearchResults = (props) => {
  return (
    <div>
      {props.searchResults.length > 0 ? props.searchResults.map((data, index) => <Flight key={index} data={data}></Flight>) : null}
    </div>
  )
}
export default SearchResults;