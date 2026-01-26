import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/Cards/CollectionCard";
import { clearCollection } from "../redux/features/collectionSlice";

const CollectionPage = memo(() => {
  const collection = useSelector((state) => state.collection.items);
  const dispatch = useDispatch();

  return (
    <div className="overflow-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
      {collection.length > 0 ? (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-center sm:text-left">Your Collection</h2>
          <button
            onClick={() => dispatch(clearCollection())}
            className="active:scale-95 transition cursor-pointer bg-red-600 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg  font-medium rounded hover:bg-red-700"
          >
            Clear Collection
          </button>
        </div>
      ) : (
        <h2 className="text-2xl sm:text-4xl lg:text-5xl py-6 sm:py-10 text-gray-300 text-center font-medium">
          Collection is Empty
        </h2>
      )}

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {collection.map((item) => (
          <div key={item.id} className="animate-fadeIn">
            <CollectionCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
});

CollectionPage.displayName = "CollectionPage";

export default CollectionPage;
