import React from "react";
import PropTypes from "prop-types";
import { ListGroupItem } from "reactstrap";
import { StarWarsConsumer } from "../StarWarsContext";

const Character = ({ character, selectCharacter, history }) => {
  return (
    <StarWarsConsumer>
      {context =>
        <ListGroupItem
          onClick={() => selectCharacter(character, history, context.updateSelectedCharacter)}
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
  selectCharacter: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Character;
