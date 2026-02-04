import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/features/searchSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, isSearching, isFilteringByType } = useSelector((s) => s.search);

  if (isSearching || isFilteringByType) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 py-6 sm:py-10 lg:py-6">
      <button
        disabled={page === 1}
        onClick={() => dispatch(setPage(page - 1))}
        className=" px-3 sm:px-5 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded disabled:bg-gray-400 hover:bg-indigo-700 transition"
      >
        Prev
      </button>
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => dispatch(setPage(i + 1))}
            className={`px-3 py-2 text-sm sm:text-base rounded transition ${
              page === i + 1
                ? "bg-indigo-600 text-white font-semibold"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
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
