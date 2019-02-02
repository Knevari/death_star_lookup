import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import axios from "axios";
import debounce from "../utils/debounce";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import CharacterDetails from "./CharacterDetails";
import NotFound from "./NotFound";
import { Container } from "reactstrap";
import { StarWarsProvider, StarWarsConsumer } from "./StarWarsContext";
import { PulseLoader } from 'halogenium';

/* Rota customizada para carregar a página de detalhes
 Somente se o usuário possui algum personagem selecionado */
const DetailsRoute = ({ component: Component, ...rest}) => {
  return (
    <StarWarsConsumer>
      {context => <Route {...rest} strict path="/lookup/details/:name" render={(props) => (
        context.selectedCharacter ? <Component {...props} /> : <Redirect to="/" />
      )} />}
    </StarWarsConsumer>
  )
}

class DeathStarLookup extends Component {
  state = {
    page: 1,
    nextPage: null,
    previousPage: null,
    totalPages: 1,
    loading: false,
    searched: false,
    characters: [],
    searchTerm: ""
  }

  changePage = async (page) => {
    await this.setState({ page });
    this.fetchCharacters();
  }

  handleSearch = debounce(searchTerm => this.setState({
    searchTerm,
    loading: true,
  }, this.fetchCharacters));

  fetchCharacters = () => {
    const { searchTerm, page } = this.state;

    axios.get(`https://swapi.co/api/people/?page=${page}&search=${searchTerm}`)
      .then(res => this.setState(prevState => ({
        characters: res.data.results,
        nextPage: res.data.next ? prevState.page + 1 : null,
        previousPage: res.data.previous ? prevState.page - 1 : null,
        totalPages: Math.ceil(res.data.count / 10),
        searched: true,
        loading: false
      })))
      .catch(err => this.setState({
        page: 1,
        totalPages: 1,
        characters: [],
        loading: false,
        searched: true,
        nextPage: null,
        previousPage: null
      }));
  }

  selectCharacter = (character, history, updateSelectedCharacter) => {
    updateSelectedCharacter(character);
    history.push("/lookup/details/" + encodeURIComponent(character.name));
    document.title = "Lookup - " + character.name;
  }

  render() {
    const { characters, loading, totalPages, page } = this.state;

    return (
      <Container className="pt-3">
        <h3 className="app-title">Death Star Lookup</h3>
        <SearchInput
          disabled={loading}
          handleSearchInput={e => this.handleSearch(e.target.value.replace(" ", "+"))}/>
        <BrowserRouter>
          <Switch>
            <Route path="/lookup" render={(props) => (
                <StarWarsProvider>
                  {loading ?
                    <div className="loader">
                      <PulseLoader color="#E7AA44" size="16px" margin="4px"/>
                    </div> :
                    <SearchResult
                      {...props}
                      page={page}
                      totalPages={totalPages}
                      changePage={this.changePage}
                      characters={characters}
                      selectCharacter={this.selectCharacter}
                    >
                        <DetailsRoute exact component={CharacterDetails} />
                    </SearchResult>}
                </StarWarsProvider>
              )} />
            <Route exact path="/" render={() => <Redirect to="/lookup" />} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default DeathStarLookup;
