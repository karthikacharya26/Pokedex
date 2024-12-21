"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PokedexGrid from "./components/PokedexGrid";
import PokemonTypeFilter from "./components/PokemonTypeFilter";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

interface PokemonTypeInfo {
  type: {
    name: string;
  };
}

const availableTypes = [
  "Grass",
  "Fire",
  "Water",
  "Electric",
  "Bug",
  "Flying",
  "Ground",
  "Fairy",
];

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("id");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const fetchPokemons = async () => {
    try {
      const req = Array.from({ length: 50 }, (_, index) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
      );
      const res = await Promise.all(req);
      const formattedData = res.map((res) => ({
        id: res.data.id,
        name: res.data.name,
        types: res.data.types.map((typeInfo: PokemonTypeInfo) => typeInfo.type.name),
        sprite: res.data.sprites.front_default,
      }));
      setPokemons(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("failed to fetch pokemon data:", error);
      setLoading(false);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedTypes.length === 0 ||
      pokemon.types.some((type) => selectedTypes.includes(type));
    return matchesSearch && matchesType;
  });

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    if (sortOption === "id") {
      return a.id - b.id;
    } else if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "type") {
      return a.types[0]?.localeCompare(b.types[0]) || 0;
    }
    return 0;
  });

  const paginatedPokemons = sortedPokemons.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon Explorer</h1>
      <input
        type="text"
        className="border p-2 rounded mb-4 w-full bg-slate-50"
        placeholder="Search Pokemon..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1);
        }}
      />
      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="sort" className="text-sm font-semibold">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded bg-slate-50"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
      </div>
      <PokemonTypeFilter
        availableTypes={availableTypes}
        selectedTypes={selectedTypes}
        onTypeSelect={setSelectedTypes}
      />
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <PokedexGrid pokemons={paginatedPokemons} />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="py-2 px-4 border border-gray-300 rounded-md"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              ⬅️
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`py-2 px-4 border ${
                  page === index + 1
                    ? "bg-blue-500 text-white"
                    : "border-gray-300"
                } rounded-md`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="py-2 px-4 border border-gray-300 rounded-md"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
