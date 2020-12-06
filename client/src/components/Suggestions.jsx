import React from "react";
import styled from "styled-components";
import OneSuggestion from "./OneSuggestion.jsx";

const SuggestionsContainer = styled.div`
  padding: 5px;
  height: 99%;
  overflow-y: scroll;
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Suggestions = (props) => {
  return (
  <SuggestionsContainer>
    <h2>Flight Suggestions</h2>
    {props.searchResults.length > 0
        ? props.searchResults.map((data, index) => (
            <OneSuggestion key={index} data={data}></OneSuggestion>
          ))
        : null}
  </SuggestionsContainer>
  )
};

export default Suggestions;