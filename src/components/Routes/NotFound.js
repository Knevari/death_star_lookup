import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <h1>Ops, parece que você acabou se perdendo no espaço, quer ajuda pra voltar pra casa?</h1>
      <Link to="/">Me leve de volta</Link>
    </Fragment>
  )
}

export default NotFound;
