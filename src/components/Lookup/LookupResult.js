import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Character from "../Character";
import { ButtonGroup, Button, ButtonToolbar, ListGroup } from "reactstrap";

const LookupResult = ({ characters, selectCharacter, children, page, totalPages, changePage, history }) => {
  return (
    <Fragment>
      {characters.length > 0 ? (
        <ListGroup className="my-3">
          {characters.map((character, index) =>
            <Character
              history={history}
              key={character.name}
              character={character}
              selectCharacter={selectCharacter}
              index={index}
            />)}
            {totalPages > 1 ? (
              <ButtonToolbar className="mt-2 mx-auto">
                <ButtonGroup>
                  <Button
                    color="danger"
                    className="change-page-btn"
                    disabled={page === 1}
                    onClick={() => changePage(page - 1)}>Anterior</Button>
                  <Button
                    color="danger"
                    className="change-page-btn"
                    disabled={page === totalPages}
                    onClick={() => changePage(page + 1)}>Próximo</Button>
                </ButtonGroup>
              </ButtonToolbar>
            ) : null}
          </ListGroup>
      ) : <h3 className="mt-3">Não foram encontrados resultados</h3>}
      {children}
    </Fragment>
  )
}

LookupResult.propTypes = {
  characters: PropTypes.array.isRequired,
  selectCharacter: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default LookupResult;
