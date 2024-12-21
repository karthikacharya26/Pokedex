import React from "react";

interface PokemonTypeFilterProps {
  availableTypes: string[];
  selectedTypes: string[];
  onTypeSelect: (types: string[]) => void;
}

const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({
  availableTypes,
  selectedTypes,
  onTypeSelect,
}) => {
  const toggleType = (type: string) => {
    const formattedType = type.toLowerCase();
    if (selectedTypes.includes(formattedType)) {
      onTypeSelect(selectedTypes.filter((t) => t != formattedType));
    } else {
      onTypeSelect([...selectedTypes, formattedType]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {availableTypes.map((type) => (
        <button
          key={type}
          onClick={() => toggleType(type)}
          className={`px-3 py-1 text-sm rounded-full border ${
            selectedTypes.includes(type.toLowerCase())
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default PokemonTypeFilter;
