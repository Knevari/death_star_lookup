import React from "react";
import PropTypes from "prop-types";
import { InputGroup, Input } from "reactstrap";

const SearchInput = ({ handleSearchInput }) => {
  return (
    <InputGroup size="lg">
      <Input
        type="text"
        spellCheck="false"
        autoComplete="off"
        placeholder="e.g. Yoda"
        onChange={handleSearchInput} />
    </InputGroup>
  )
}

SearchInput.propTypes = {
  handleSearchInput: PropTypes.func.isRequired
}

export default SearchInput;
