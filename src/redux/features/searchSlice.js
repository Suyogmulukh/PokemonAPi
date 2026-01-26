import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  tag: "",
  page: 1,
  results: [],
  loading: false,
  error: null,
  isSearching: false,
  isFilteringByType: false,
  typePokemonList: [],
  totalTypeResults: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      state.isSearching = action.payload.trim() !== "";
      state.isFilteringByType = false;
    },
    setTag: (state, action) => {
      state.tag = action.payload;
      state.page = 1;
      state.isFilteringByType = action.payload !== "";
      state.isSearching = false;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTypePokemonList: (state, action) => {
      state.typePokemonList = action.payload.pokemonList;
      state.totalTypeResults = action.payload.total;
    },
    resetFilters: (state) => {
      state.query = "";
      state.tag = "";
      state.page = 1;
      state.isSearching = false;
      state.isFilteringByType = false;
    },
  },
});

export const {
  setQuery,
  setTag,
  setPage,
  setResults,
  setLoading,
  setError,
  setTypePokemonList,
  resetFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
