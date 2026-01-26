import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/features/searchSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, isSearching, isFilteringByType } = useSelector((s) => s.search);

  if (isSearching || isFilteringByType) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 py-6 sm:py-10">
      <button
        disabled={page === 1}
        onClick={() => dispatch(setPage(page - 1))}
        className=" px-3 sm:px-5 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded disabled:bg-gray-400 hover:bg-indigo-700 transition"
      >
        Prev
      </button>
      <span className="px-3 sm:px-6 py-2 text-sm sm:text-lg font-semibold">Page {page}</span>
      <button
        onClick={() => dispatch(setPage(page + 1))}
        className="  px-3 sm:px-5 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
