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

import { useEffect, useState, useRef } from "react";
import Cards from "./Cards";
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
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setLoading());
        let pokemonList = [];

        if (isSearching && query.trim()) {
          try {
            const pokemon = await pokimonApi(query);
            pokemonList = [pokemon];
          } catch (searchErr) {
            dispatch(setError("Pokemon not found. Please try another name."));
            return;
          }
        } else if (isFilteringByType && tag) {
          try {
            const response = await fetchPokemonsByType(tag, page, 12);
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
          pokemonList = await fetchPaginatedPokemons(page, 12);
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

  useEffect(() => {
    if (results.length > 0 && isInitialLoad.current) {
      // Only auto-select on desktop (lg and above)
      if (window.innerWidth >= 1024) {
        setSelectedPokemon(results[0]);
      }
      isInitialLoad.current = false;
    }
  }, [results]);

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
      <div className="flex gap-0 w-full min-h-screen h-auto lg:h-1/3">
        {/* LEFT CONTAINER - POKEMON LIST */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-8 sm:px-6 lg:px-10 py-6">
            {results.map((item, idx) => (
              <div key={item.id || idx}>
                <Cards item={item} onCardClick={setSelectedPokemon} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTAINER - POKEMON DETAILS (DESKTOP) */}
        <div className="hidden lg:flex w-1/3 overflow-y-auto">
          {selectedPokemon ? (
            <InfoCard
              pokemon={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            />
          ) : (
            <div className="w-full flex items-center justify-center text-gray-400">
              <p className="text-lg">Select a Pokemon to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MODAL - POKEMON DETAILS */}
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-50 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <InfoCard
              pokemon={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            />
          </div>
          <button
            onClick={() => setSelectedPokemon(null)}
            className="w-full py-3 bg-gray-800 text-white font-semibold border-t border-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default CardGrid;
