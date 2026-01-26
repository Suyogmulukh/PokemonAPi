import React from "react";
import CardGrid from "../components/Cards/CardGrid";
import SearchBar from "../components/Cards/SearchBar";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";

const Header = () => {
  const { query, tag } = useSelector((store) => store.search);

  return (
    <div>
      <SearchBar />
      {(query !== "" || tag !== "") && <CardGrid />}
      {query === "" && tag === "" && (
        <>
          <CardGrid />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Header;
