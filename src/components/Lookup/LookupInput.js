import React from "react";
import PropTypes from "prop-types";
import { InputGroup, Input } from "reactstrap";

const LookupInput = ({ handleSearch }) => {
  return (
    <InputGroup size="lg">
      <Input
        type="text"
        spellCheck="false"
        autoComplete="off"
        placeholder="e.g. Yoda"
        onChange={handleSearch} />
    </InputGroup>
  )
}

LookupInput.propTypes = {
  handleSearch: PropTypes.func.isRequired
}

export default LookupInput;
