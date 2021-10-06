import React, { Component } from "react";
import axios from "axios";
import debounce from "../../utils/debounce";
import { Container } from "reactstrap";
import { StarWarsProvider } from "../StarWarsContext";
import Routes from "../Routes";

class DeathStarLookup extends Component {
	state = {
		page: 1,
		nextPage: null,
		previousPage: null,
		totalPages: 1,
		loading: false,
		searched: false,
		characters: [],
		searchTerm: "",
	};

	changePage = async (page) => {
		await this.setState({ page });
		this.fetchCharacters();
	};

	handleSearch = debounce((searchTerm) =>
		this.setState(
			{
				page: 1,
				searchTerm,
				loading: true,
			},
			this.fetchCharacters
		)
	);

	fetchCharacters = async () => {
		const { searchTerm, page } = this.state;

		try {
			const response = await axios.get(
				`https://swapi.dev/api/people/?page=${page}&search=${searchTerm}`
			);
			const data = response.data;

			this.setState((prevState) => ({
				characters: data.results,
				nextPage: data.next ? prevState.page + 1 : null,
				previousPage: data.previous ? prevState.page - 1 : null,
				totalPages: Math.ceil(data.count / 10),
				searched: true,
				loading: false,
			}));
		} catch (err) {
			this.setState({
				page: 1,
				totalPages: 1,
				characters: [],
				loading: false,
				searched: true,
				nextPage: null,
				previousPage: null,
			});
		}
	};

	selectCharacter = (character, history, updateSelectedCharacter) => {
		updateSelectedCharacter(character);
		history.push("/lookup/details/" + encodeURIComponent(character.name));
		document.title = "Lookup - " + character.name;
	};

	componentDidMount() {
		this.fetchCharacters();
	}

	render() {
		return (
			<Container className="pt-3">
				<StarWarsProvider>
					<Routes
						handleSearch={this.handleSearch}
						page={this.state.page}
						totalPages={this.state.totalPages}
						changePage={this.changePage}
						characters={this.state.characters}
						selectCharacter={this.selectCharacter}
					/>
				</StarWarsProvider>
			</Container>
		);
	}
}

export default DeathStarLookup;
