import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "reactstrap";
import { StarWarsConsumer } from "../StarWarsContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InfoModal from "../Modal/InfoModal";
import decimal from '../../utils/decimal';

const CharacterDetails = () => {
  return (
    <StarWarsConsumer>
      {context => {
        const character = context.selectedCharacter;

        return (
          <Jumbotron className="character">
            <div className="character-details mb-4">
              <h1>{character.name} {character.name in context.favoriteCharacters ?
                  <span onClick={() => context.removeFromFavorites(character.name)} className="favorite">&#9733;</span> : null}</h1>
              <h6>Altura: {character.height}</h6>
              <h6>Peso: {character.mass}kg</h6>
              <h6>Cor do Cabelo: {character.hair_color}</h6>
              <h6>Cor da Pele: {character.skin_color}</h6>
              <h6>Cor dos Olhos: {character.eye_color}</h6>
              <h6>Ano de Nascimento: {character.birth_year}</h6>
              <h6>Gênero: {character.gender}</h6>
            </div>

            <SkeletonTheme color="#ccc">
              <div className="character-species">
                <h4>{character.species.length ? "Espécies: " : null}</h4>
                <ul>
                  {character.species.map((specie, index) => <li key={index}>{specie.name || <Skeleton />}</li>)}
                </ul>
              </div>

              <div className="character-vehicles">
                <h4>{character.vehicles.length ? "Veículos: " : null}</h4>
                <ul className="has-modal">
                  {character.vehicles.map((vehicle, index) => {
                    const cost = decimal(vehicle.cost_in_credits);
                    const cargo = decimal(vehicle.cargo_capacity);
                    const length = decimal(vehicle.length);

                    return (
                      <InfoModal title={vehicle.name} key={index} trigger={<li className="info-modal-title">{vehicle.name || <Skeleton />}</li>}>
                        <h5>Modelo:</h5><p>{vehicle.model}</p>
                        <h5>Valor:</h5><p>{cost ? cost + " Créditos" : "Desconhecido"}</p>
                        <h5>Quantidade de Passageiros:</h5><p>{vehicle.passengers}</p>
                        <h5>Capacidade de Carga:</h5><p>{cargo ? cargo + " kg" : "Desconhecido"}</p>
                        <h5>Classe do Veículo:</h5><p>{vehicle.vehicle_class}</p>
                        <h5>Largura:</h5><p>{length ? length + " m" : "Desconhecido"}</p>
                      </InfoModal>
                    )
                  })}
                </ul>
              </div>

              <div className="character-films">
                <h4>{character.films.length ? "Filmes: " : null}</h4>
                <ul className="has-modal">
                  {character.films.map((film, index) => {
                    return (
                      <InfoModal title={film.title} key={index} trigger={<li className="info-modal-title">{film.title || <Skeleton />}</li>}>
                        <h5>Sinopse:</h5><p>{film.opening_crawl}</p>
                        <h5>Diretor:</h5><p>{film.director}</p>
                        <h5>Produtor:</h5><p>{film.producer}</p>
                        <h5>Data de Lançamento:</h5><p>{film.release_date}</p>
                      </InfoModal>
                    )
                  })}
                </ul>
              </div>

              <div className="character-starships">
                <h4>{character.starships.length ? "Starships: " : null}</h4>
                <ul className="has-modal">
                  {character.starships.map((starship, index) => {
                    const cost = decimal(starship.cost_in_credits);
                    const cargo = decimal(starship.cargo_capacity);
                    const length = decimal(starship.length);

                    return (
                      <InfoModal title={starship.name} key={index} trigger={<li className="info-modal-title">{starship.name || <Skeleton />}</li>}>
                        <h5>Modelo:</h5><p>{starship.model}</p>
                        <h5>Fabricante:</h5><p>{starship.manufacturer}</p>
                        <h5>Valor:</h5><p>{cost ? cost + " Créditos" : "Desconhecido"}</p>
                        <h5>Largura:</h5><p>{length ? length + " m" : "Desconhecido"}</p>
                        <h5>Velocidade Máxima na Atmosfera:</h5><p>{starship.max_atmosphering_speed}km</p>
                        <h5>Capacidade de Carga:</h5><p>{cargo ? cargo + " kg" : "Desconhecido"}</p>
                        <h5>Classe da Nave:</h5><p>{starship.starship_class}</p>
                        <h5>Classe do Hyperdrive:</h5><p>{starship.hyperdrive_rating}</p>
                      </InfoModal>
                    )
                  })}
                </ul>
              </div>

              <div className="add-to-favorites">
                {character.name in context.favoriteCharacters ?
                  <Button
                    block
                    color="danger"
                    disabled>Personagem já adicionado</Button> :
                  <Button
                    block
                    color="warning"
                    onClick={() => context.addToFavorites(character)}>Adicionar aos favoritos</Button>}

                <Link className="favorites-link" to="/favorites">
                  <Button className="mt-2" block color="info">
                    Ver minha lista de favoritos
                  </Button>
                </Link>
              </div>
            </SkeletonTheme>

          </Jumbotron>
        )
      }}
    </StarWarsConsumer>
  )
}

export default CharacterDetails;
