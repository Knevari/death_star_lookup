import React, { Component, createContext } from "react";
import axios from "axios";

const StarWarsContext = createContext();

// Aqui está toda a lógica de substituição
// das URLs contidas na resposta da API
export class StarWarsProvider extends Component {
  constructor(props) {
    super(props);

    this.updateSelectedCharacter = async (selectedCharacter) => {
      await this.setState({ selectedCharacter });
      await this.getCharacterData();
    }

    this.fetchData = async (data) => {
      if(Array.isArray(data)) {
        const items = [];

        for(let item of data) {
          const response = await axios.get(item);
          items.push(response.data);
        }

        return items;
      } else {
        const response = await axios.get(data);
        return response.data;
      }
    }

    this.updateCharacterProperty = (property) => {
      this.fetchData(this.state.selectedCharacter[property])
        .then(data => {
          this.setState(prevState => ({
            selectedCharacter:  {
              ...prevState.selectedCharacter,
              [property]: data
            }
          }))
        })
    }

    this.getCharacterData = () => {
      if(this.state.selectedCharacter) {
        // TODO: Criar uma função pra iterar sobre as urls
        this.updateCharacterProperty("species");
        this.updateCharacterProperty("films");
        this.updateCharacterProperty("vehicles");
        this.updateCharacterProperty("starships");
        this.updateCharacterProperty("homeworld");
      } else {
        return false;
      }
    }

    this.loadFavoriteCharactersFromSession = () => {
      const favoriteCharacters = JSON.parse(sessionStorage.getItem("favoriteCharacters")) || {};
      this.setState({ favoriteCharacters })
    }

    this.addToFavorites = (character) => {
      let favoriteCharacters = JSON.parse(sessionStorage.getItem("favoriteCharacters")) || {};
      favoriteCharacters = {...favoriteCharacters, [character.name]: character};
      this.setState({ favoriteCharacters });
      sessionStorage.setItem("favoriteCharacters", JSON.stringify(favoriteCharacters));
    }

    this.removeFromFavorites = (characterName) => {
      let favoriteCharacters = JSON.parse(sessionStorage.getItem("favoriteCharacters")) || {};
      delete favoriteCharacters[characterName];
      this.setState({ favoriteCharacters });
      sessionStorage.setItem("favoriteCharacters", JSON.stringify(favoriteCharacters));
    }

    this.state = {
      selectedCharacter: null,
      favoriteCharacters: {},
      updateSelectedCharacter: this.updateSelectedCharacter,
      updateCharacterProperty: this.updateCharacterProperty,
      getCharacterData: this.getCharacterData,
      addToFavorites: this.addToFavorites,
      removeFromFavorites: this.removeFromFavorites
    }
  }

  componentDidMount() {
    this.getCharacterData();
    this.loadFavoriteCharactersFromSession()
  }

  render() {
    return (
      <StarWarsContext.Provider value={this.state}>
        {this.props.children}
      </StarWarsContext.Provider>
    )
  }
}

export const StarWarsConsumer = ({ children }) => {
  return (
    <StarWarsContext.Consumer>
      {children}
    </StarWarsContext.Consumer>
  )
}

export default StarWarsContext
