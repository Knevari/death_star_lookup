import React from "react";
import { Route, Redirect } from "react-router-dom";
import { StarWarsConsumer } from "../StarWarsContext";

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

export default DetailsRoute;
