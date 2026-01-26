import axios from "axios";

const POKIMONAPI = import.meta.env.VITE_POKEMON_API;

export const pokimonApi = async (query) => {
  try {
    const res = await axios.get(`${POKIMONAPI}/pokemon/${query.toLowerCase()}`);
    return res.data;
  } catch (error) {
    throw new Error("Pokemon not found");
  }
};

export const fetchRandomPokemons = async (count = 10) => {
  try {
    const randomIds = Array.from(
      { length: count },
      () => Math.floor(Math.random() * 898) + 1,
    );
    const pokemonPromises = randomIds.map((id) =>
      axios.get(`${POKIMONAPI}/pokemon/${id}`),
    );
    const responses = await Promise.all(pokemonPromises);
    return responses.map((res) => res.data);
  } catch (error) {
    throw new Error("Failed to fetch random pokemons");
  }
};

export const fetchPaginatedPokemons = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const res = await axios.get(
      `${POKIMONAPI}/pokemon?offset=${offset}&limit=${limit}`,
    );
    const pokemonPromises = res.data.results.map((pokemon) =>
      axios.get(pokemon.url),
    );
    const responses = await Promise.all(pokemonPromises);
    return responses.map((res) => res.data);
  } catch (error) {
    throw new Error("Failed to fetch paginated pokemons");
  }
};

export const fetchPokemonsByType = async (typeName, page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${POKIMONAPI}/type/${typeName.toLowerCase()}`);
    const allPokemon = res.data.pokemon.map((p) => p.pokemon);
    const total = allPokemon.length;

    const offset = (page - 1) * limit;
    const paginatedPokemon = allPokemon.slice(offset, offset + limit);

    const pokemonPromises = paginatedPokemon.map((p) => axios.get(p.url));
    const responses = await Promise.all(pokemonPromises);

    return {
      data: responses.map((res) => res.data),
      total,
    };
  } catch (error) {
    throw new Error("Failed to fetch pokemon by type");
  }
};

export const formatPokemonData = (pokemonList) => {
  return pokemonList
    .map((item) => {
      const imageUrl =
        item?.sprites?.other?.["official-artwork"]?.front_default ||
        item?.sprites?.front_default ||
        "https://via.placeholder.com/200?text=No+Image";

      return {
        id: item.id,
        type: "pokemon",
        title: item.name || "Unknown",
        thumbnail: imageUrl,
        src: imageUrl,
        url: `${POKIMONAPI}/pokemon/${item.id}`,
        rawData: item,
      };
    })
    .filter(
      (item) =>
        item.thumbnail !== "https://via.placeholder.com/200?text=No+Image",
    );
};
