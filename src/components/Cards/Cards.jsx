import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCollection,
  addedToast,
} from "../../redux/features/collectionSlice";
import useLazyLoad from "../../Hooks/useLazyLoad";

const Card = ({ item, onCardClick }) => {
  const { ref, isVisible } = useLazyLoad();
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useDispatch();

  const addToCollection = (e) => {
    e.stopPropagation();
    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleCardClick}
      className="  relative bg-gray-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer w-full max-w-40 sm:max-w-50 md:max-w-57.5 lg:max-w-62.5 aspect-5/6"
    >
      {isVisible ? (
        <>
          <div
            className={`w-full h-40 sm:h-48 md:h-56 lg:h-64 transition-opacity duration-500 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
            />
          </div>

          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          )}
        </>
      ) : (
        <div className="w-full h-64 bg-gray-300 animate-pulse" />
      )}

      <div className="absolute bottom-0 w-full flex justify-between items-center px-4 py-3 bg-linear-to-t from-black to-transparent text-white">
        <h2 className="text-sm sm:text-base font-bold capitalize truncate">
          {item.title}
        </h2>

        <button
          onClick={addToCollection}
          className="bg-indigo-600 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm active:scale-95"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Card;
