import { useDispatch } from "react-redux";
import {
  addCollection,
  removeCollection,
  addedToast,
  removeToast,
} from "../../redux/features/collectionSlice";

const InfoCard = ({ pokemon, isFromCollection }) => {
  const dispatch = useDispatch();
  const data = pokemon.rawData || pokemon;

  const handleAddToCollection = () => {
    dispatch(addCollection(pokemon));
    dispatch(addedToast());
  };

  const handleRemoveFromCollection = () => {
    dispatch(removeCollection(pokemon.id));
    dispatch(removeToast());
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-gray-300">

      {/* BODY */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-hide">
        <div className="flex justify-between">

      {/* HEADER */}
      <div className="flex items-center justify-between pt-20 px-3 py-5 border-gray-700 border-b-2 h-16 ">
        <h1 className="text-2xl font-bold uppercase font-sans">{data.name}</h1>
      </div>
        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={data?.sprites?.other?.["official-artwork"]?.front_default}
            alt={data.name}
            className="w-48 object-contain drop-shadow-lg"
          />
        </div>
      </div>

        {/* STATS BOXES */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-300 rounded-xl py-2 px-3">
            <p className="text-xs text-gray-800">Height</p>
            <p className="text-lg font-semibold text-gray-800">
              {data?.height ? (data.height / 10).toFixed(2) : "N/A"} m
            </p>
          </div>

          <div className="bg-gray-300 rounded-xl py-2 px-3">
            <p className="text-xs text-gray-800">Weight</p>
            <p className="text-lg font-semibold text-gray-800">
              {data?.weight ? (data.weight / 10).toFixed(2) : "N/A"} kg
            </p>
          </div>
        </div>

        {/* TYPES */}
        <div>
          <p className="text-sm text-gray-300 mb-2 font-bold">Types</p>
          <div className="flex flex-wrap gap-2">
            {data?.types?.map((typeObj) => (
              <span
              key={typeObj.type.name}
              className="px-3 py-1 rounded-full text-xs font-semibold capitalize text-gray-100 bg-indigo-600"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* ABILITIES */}
        <div>
          <p className="text-sm text-gray-300 mb-2 font-bold">Abilities</p>
          <div className="flex flex-wrap gap-2">
            {data?.abilities?.map((abilityObj) => (
              <span
              key={abilityObj.ability.name}
              className="px-3 py-1 rounded-full text-xs capitalize bg-gray-600 text-gray-200"
              >
                {abilityObj.ability.name}
              </span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div>
          <p className="text-sm font-bold text-gray-300 mb-3">Stats</p>
          <div className="space-y-3">
            {data?.stats?.map((statObj) => (
              <div key={statObj.stat.name}>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="capitalize">{statObj.stat.name}</span>
                  <span>{statObj.base_stat}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{
                      width: `${(statObj.base_stat / 255) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="px-6 py-6 border-t border-gray-700">
        <button
          onClick={
            isFromCollection
              ? handleRemoveFromCollection
              : handleAddToCollection
          }
          className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition active:scale-95 ${
            isFromCollection
              ? "bg-red-500 hover:bg-red-600"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          {isFromCollection ? "Remove from Collection" : "Add to Collection"}
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
