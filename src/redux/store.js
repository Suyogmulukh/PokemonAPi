import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import collectionReducer from "./features/collectionSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    collection: collectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 128,
        ignoredActions: ["search/setResults", "search/setTypePokemonList"],
      },
    }),
});
