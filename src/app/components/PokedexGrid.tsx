import React from "react";
import PokemonCard from "./PokemonCard";

interface PokedexGridProps {
  pokemons: {
    id: number;
    name: string;
    types: string[];
    sprite: string;
  }[];
}

const PokedexGrid: React.FC<PokedexGridProps> = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

export default PokedexGrid;
