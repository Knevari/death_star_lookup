import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Character from "./Character";
import { ButtonGroup, Button, ButtonToolbar, ListGroup } from "reactstrap";

const SearchResult = ({ characters, selectCharacter, children, page, totalPages, changePage, ...rest }) => {
  return (
    <Fragment>
      {characters.length > 0 ? (
        <ListGroup className="my-3">

          {characters.map((character, index) =>
            <Character
              {...rest}
              characterSelectionHandler={selectCharacter}
              character={character}
              key={character.name}
              index={index} />)}

              <ButtonToolbar className="mt-2 mx-auto">
                <ButtonGroup>
                  {totalPages > 1 ? (
                    <Fragment>
                      <Button className="change-page-btn" disabled={page === 1} onClick={() => changePage(page - 1)}>Anterior</Button>
                      <Button className="change-page-btn" disabled={page === totalPages} onClick={() => changePage(page + 1)}>Próximo</Button>
                    </Fragment>
                  ) : null}
                </ButtonGroup>
              </ButtonToolbar>

          </ListGroup>
      ) : <h3 className="mt-3">Não foram encontrados resultados</h3>}
      {children}
    </Fragment>
  )
}

SearchResult.propTypes = {
  characters: PropTypes.array.isRequired,
  selectCharacter: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
}

export default SearchResult
