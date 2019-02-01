import React from "react";
import PropTypes from "prop-types";
import { ListGroupItem } from "reactstrap";
import { StarWarsConsumer } from "./StarWarsContext";

const Character = ({ character, characterSelectionHandler, history }) => {
  return (
    <StarWarsConsumer>
      {context =>
        <ListGroupItem
          onClick={() => characterSelectionHandler(character, history, context.updateSelectedCharacter)}
          className="character-list-item"
          >
          <h5 to={"/lookup/details/" + encodeURIComponent(character.name)}>{character.name}</h5>
        </ListGroupItem>
      }
    </StarWarsConsumer>
  )
}

Character.propTypes = {
  character: PropTypes.object.isRequired,
  characterSelectionHandler: PropTypes.func.isRequired
}

export default Character;
