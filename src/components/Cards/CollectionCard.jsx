import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCollection,
  removeToast,
} from "../../redux/features/collectionSlice";
import useLazyLoad from "../../Hooks/useLazyLoad";
import InfoCard from "./InfoCard";

const CollectionCard = memo(({ item }) => {
  const dispatch = useDispatch();
  const { ref, isVisible } = useLazyLoad();
  const [loaded, setLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const removeFromCollection = (e) => {
    e.stopPropagation();
    dispatch(removeCollection(item.id));
    dispatch(removeToast());
  };

  const opacityClass = loaded ? "opacity-100" : "opacity-0";

  return (
    <>
      <div
        ref={ref}
        onClick={() => setShowInfo(true)}
        className="relative bg-gray-600 rounded-xl overflow-hidden shadow-lg cursor-pointer w-full max-w-40 sm:max-w-50 md:max-w-57.5 lg:max-w-65 aspect-5/6"
      >
        {/* Skeleton */}
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}

        {isVisible && (
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-contain transition-opacity duration-500 ${opacityClass}`}
          />
        )}

        <div className="absolute bottom-0 w-full flex justify-between items-center px-4 py-4 bg-linear-to-t from-black/70 to-transparent text-gray-100 uppercase">
          <h2 className="text-xs sm:text-sm font-semibold truncate bg-gray-600 bg-linear-to-t from-black/70 to-transparent rounded-3xl px-2 sm:px-3 py-1">
            {item.title}
          </h2>
          <button
            onClick={removeFromCollection}
            className="bg-indigo-600 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded hover:bg-indigo-700 active:scale-95 transition"
          >
            Remove
          </button>
        </div>
      </div>

      {showInfo && (
        <InfoCard
          pokemon={item}
          onClose={() => setShowInfo(false)}
          isFromCollection={true}
        />
      )}
    </>
  );
});

CollectionCard.displayName = "CollectionCard";

export default CollectionCard;
