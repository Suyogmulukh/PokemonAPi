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
      className=" relative w-full max-w-40 sm:max-w-50 md:max-w-57.5 lg:max-w-62.5 aspect-5/6 bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {isVisible ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCollection(e);
            }}
            className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#EFEFEF"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
          </button>

          {/* Image */}
          <div
            className={`w-full h-full flex items-center justify-center transition-opacity duration-500 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className="w-full h-full object-contain p-5 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-500 animate-pulse" />
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gray-500 animate-pulse" />
      )}

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 w-full px-3 py-2 bg-linear-to-t from-black/90 to-transparent">
        <h2 className="text-sm font-semibold text-white truncate capitalize">
          {item.title}
        </h2>
      </div>
    </div>
  );
};

export default Card;
