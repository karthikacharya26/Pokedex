import React from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  types,
  sprite,
}) => {
  return (
    <div className="border rounded p-4 flex flex-col items-center bg-slate-100">
      <img src={sprite} alt={name} className="w-25 h-25" loading="lazy" />
      <h2 className="text-lg font-bold mt-2">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
      <p className="text-sm text-gray-600">ID: {id}</p>
      <div className="flex flex-wrap justify-center mt-2">
        {types.map((type) => (
          <span
            key={type}
            className="border rounded-full px-2 py-1 m-1 text-s bg-blue-300"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
