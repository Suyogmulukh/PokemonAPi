import { useDispatch, useSelector } from "react-redux";
import {
  pokimonApi,
  fetchPaginatedPokemons,
  fetchPokemonsByType,
  formatPokemonData,
} from "../../Apis/PokimonApi";
import {
  setLoading,
  setError,
  setResults,
  setTypePokemonList,
} from "../../redux/features/searchSlice";
import { useEffect, useState } from "react";
import ResultCard from "./Cards";
import InfoCard from "./InfoCard";

const CardGrid = () => {
  const dispatch = useDispatch();
  const {
    query,
    tag,
    page,
    results,
    loading,
    error,
    isSearching,
    isFilteringByType,
  } = useSelector((store) => store.search);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setLoading());
        let pokemonList = [];

        if (isSearching && query.trim()) {
          // Search by name - single pokemon
          try {
            const pokemon = await pokimonApi(query);
            pokemonList = [pokemon];
          } catch (searchErr) {
            dispatch(setError("Pokemon not found. Please try another name."));
            return;
          }
        } else if (isFilteringByType && tag) {
          // Filter by type with pagination
          try {
            const response = await fetchPokemonsByType(tag, page, 10);
            pokemonList = response.data;
            dispatch(
              setTypePokemonList({
                pokemonList: formatPokemonData(pokemonList),
                total: response.total,
              }),
            );
          } catch (typeErr) {
            dispatch(setError("Failed to fetch pokemon by type"));
            return;
          }
        } else {
          // Load paginated list (default)
          pokemonList = await fetchPaginatedPokemons(page, 10);
        }

        const data = formatPokemonData(pokemonList);

        if (data.length === 0) {
          dispatch(setError("No pokemon data found"));
          return;
        }

        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err.message || "Failed to fetch pokemon"));
      }
    };

    getData();
  }, [query, tag, page, isSearching, isFilteringByType, dispatch]);

  if (error)
    return (
      <h1 className="text-center text-red-500 text-2xl mt-10">
        Error: {error}
      </h1>
    );
  if (loading)
    return <h1 className="text-center text-2xl mt-10">Loading...</h1>;

  if (results.length === 0)
    return (
      <h1 className="text-center text-gray-500 text-2xl mt-10">
        No Pokemon found
      </h1>
    );

  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-8 sm:px-6 lg:px-10 py-6">
        {results.map((item, idx) => (
          <div key={item.id || idx}>
            <ResultCard item={item} onCardClick={setSelectedPokemon} />
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <InfoCard
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </>
  );
};

export default CardGrid;
