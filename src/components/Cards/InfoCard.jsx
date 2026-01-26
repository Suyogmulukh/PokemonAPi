import { useDispatch } from "react-redux";
import {
  addCollection,
  removeCollection,
  addedToast,
  removeToast,
} from "../../redux/features/collectionSlice";

const InfoCard = ({ pokemon, onClose, isFromCollection }) => {
  const dispatch = useDispatch();
  const data = pokemon.rawData || pokemon;

  const handleAddToCollection = () => {
    dispatch(addCollection(pokemon));
    dispatch(addedToast());
    onclose();
  };

  const handleRemoveFromCollection = () => {
    dispatch(removeCollection(pokemon.id));
    dispatch(removeToast());
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-gray-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm sm:max-w-xl lg:max-w-3xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase font-sans">
            {data.name}
          </h1>
          <button
            onClick={onClose}
            className="text-2xl sm:text-3xl leading-none text-gray-300 hover:text-gray-500 transition"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto scrollbar-hide">
          {/* IMAGE */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex justify-self-start px-10">
              <img
                src={data?.sprites?.other?.["official-artwork"]?.front_default}
                alt={data.name}
                className="w-32 sm:w-40 md:w-48 lg:w-52 object-contain drop-shadow-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
              <div className="bg-gray-300 rounded-xl py-3 px-4 sm:px-8">
                <p className="text-sm text-gray-800">Height</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {data?.height ? (data.height / 10).toFixed(2) : "N/A"} m
                </p>
              </div>

              <div className="bg-gray-300 rounded-xl py-3 px-4 sm:px-8">
                <p className="text-sm text-gray-800">Weight</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {data?.weight ? (data.weight / 10).toFixed(2) : "N/A"} kg
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-around items-start sm:items-center gap-6">
            <div>
              <p className="text-sm text-gray-300 mb-3 font-bold">Types</p>
              <div className="flex flex-wrap gap-2">
                {data?.types?.map((typeObj) => (
                  <span
                    key={typeObj.type.name}
                    className="px-4 py-1 rounded-full text-sm font-semibold capitalize text-gray-100 bg-indigo-600 shadow"
                  >
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* ABILITIES */}
            <div>
              <p className="text-sm text-gray-300 mb-3">Abilities</p>
              <div className="flex flex-wrap gap-2">
                {data?.abilities?.map((abilityObj) => (
                  <span
                    key={abilityObj.ability.name}
                    className="px-4 py-1 rounded-full text-sm capitalize bg-gray-600 text-gray-200"
                  >
                    {abilityObj.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div>
            <p className="text-lg uppercase font-bold font-mono text-gray-300 mb-4">
              Stats
            </p>
            <div className="space-y-3">
              {data?.stats?.map((statObj) => (
                <div key={statObj.stat.name}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="capitalize">{statObj.stat.name}</span>
                    <span>{statObj.base_stat}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full bg-indigo-600 transition-all"
                      style={{
                        width: `${(statObj.base_stat / 255) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION */}
          <button
            onClick={
              isFromCollection
                ? handleRemoveFromCollection
                : handleAddToCollection
            }
            className={`w-full py-2 sm:py-3 rounded-xl text-white font-semibold text-base sm:text-lg transition active:scale-95 ${
              isFromCollection
                ? "bg-red-500 hover:bg-red-600"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {isFromCollection ? "Remove from Collection" : "Add to Collection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
