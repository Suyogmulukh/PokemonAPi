import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery, setTag } from "../../redux/features/searchSlice";

const POKEMON_TYPES = [
  { value: "", label: "✅ ALL" },
  { value: "fire", label: "🔥 FIRE" },
  { value: "water", label: "💧 WATER" },
  { value: "grass", label: "🌿 GRASS" },
  { value: "electric", label: "⚡ ELECTRIC" },
  { value: "ice", label: "❄️ ICE" },
  { value: "fighting", label: "🥊 FIGHTING" },
  { value: "poison", label: "☠️ POISON" },
  { value: "ground", label: "🌍 GROUND" },
  { value: "flying", label: "🕊️ FLYING" },
  { value: "psychic", label: "🔮 PSYCHIC" },
  { value: "bug", label: "🐞 BUG" },
  { value: "rock", label: "🪨 ROCK" },
  { value: "ghost", label: "👻 GHOST" },
  { value: "dragon", label: "🐉 DRAGON" },
];

const SearchBar = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [tag, setTagValue] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  }, []);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text.trim()));
  };

  const handleTagSelect = (value) => {
    setTagValue(value);
    dispatch(setTag(value));
    setOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-gray-800 py-3 px-4 sm:px-8 lg:px-24">
  
  {/* Title Section */}
  <div className="w-full lg:w-auto text-center lg:text-left text-gray-300">
    <h1 className="text-2xl sm:text-2xl capitalize">Pokemon Api</h1>
        <h3 className="text-sm sm:text-base capitalize mt-1 lg:px-2">{user ? `Hey! ${user.username}!!!` : "Heey! Guest"}</h3>
  </div>

  {/* Form */}
  <form
    onSubmit={submitHandler}
    className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 w-full lg:w-auto"
  >
    {/* Search Input */}
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="border-2 px-4 py-2 sm:px-6 sm:py-2 text-base sm:text-base rounded outline-none w-full sm:w-64"
      type="text"
      placeholder="Search Pokémon..."
    />

    {/* Search Button */}
    <button
      type="submit"
      className="border-2 px-4 py-2 sm:px-6 sm:py-2 text-base sm:text-base rounded active:scale-95 w-full sm:w-auto"
    >
      Search
    </button>

    {/* Dropdown */}
    <div
      ref={ref}
      className="relative w-full sm:w-36"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full border-2 px-3 py-2 sm:py-2 text-base sm:text-base rounded text-left"
      >
        {tag ? tag.toUpperCase() : "Tags"}
      </button>

      {open && (
        <ul className="absolute z-50 w-full bg-gray-700 text-white rounded-lg shadow-lg max-h-52 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {POKEMON_TYPES.map((opt) => (
            <li
              key={opt.label}
              onClick={() => handleTagSelect(opt.value)}
              className="px-3 py-2 hover:bg-gray-600 cursor-pointer text-sm sm:text-base"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  </form>
</div>
  )
}

export default SearchBar;
