import React from "react";
import Flight from "./Flight.jsx";
import styled from "styled-components";

const ResultsContainer = styled.div`
  border: solid 10px;
  padding: 20px;
`;

const SearchResults = (props) => {
  return (
    <ResultsContainer>
      {props.searchResults.length > 0
        ? props.searchResults.map((data, index) => (
            <Flight key={index} data={data}></Flight>
          ))
        : null}
    </ResultsContainer>
  );
};
export default SearchResults;