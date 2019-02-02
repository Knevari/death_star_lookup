import React, { Fragment } from "react";
import { StarWarsConsumer } from "../StarWarsContext";
import { Card, Button, CardTitle, CardText, CardColumns,
 CardSubtitle, CardBody } from 'reactstrap';
import { NavLink } from "react-router-dom";

const Favorites = () => {
  return (
    <StarWarsConsumer>
      {context => {
        function convertToArray(obj) {
          let result = [];
          for(let item in obj) {
            result.push(obj[item])
          }
          return result;
        }

        const favorites = convertToArray(context.favoriteCharacters);

        return (
          <Fragment>
            <h3 className="app-title"><NavLink to="/">Death Star Lookup</NavLink></h3>
            <CardColumns>
              {favorites.map(favorite => (
                <Card key={favorite.name} body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                  <CardTitle><h2>{favorite.name}</h2></CardTitle>
                  <CardText>
                    <div className="character-details mb-4">
                      <h6>Altura: {favorite.height}</h6>
                      <h6>Peso: {favorite.mass}kg</h6>
                      <h6>Cor do Cabelo: {favorite.hair_color}</h6>
                      <h6>Cor da Pele: {favorite.skin_color}</h6>
                      <h6>Cor dos Olhos: {favorite.eye_color}</h6>
                      <h6>Ano de Nascimento: {favorite.birth_year}</h6>
                      <h6>Gênero: {favorite.gender}</h6>
                    </div>
                  </CardText>
                  <Button
                    onClick={() => context.removeFromFavorites(favorite.name)}
                    color="danger">Remover</Button>
                </Card>
              ))}
            </CardColumns>
          </Fragment>
        )
      }}
    </StarWarsConsumer>
  )
}

export default Favorites;
