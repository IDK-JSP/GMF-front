import { useState, useRef, useEffect } from "react";
import FavoriteButton from "../button/FavoriteButton";
import { getIngredients } from "../../api/getIngredients";
import { IngredientType } from "../../1_types/IngredientType";



export default function IngredientSelect() {
  const [query, setQuery] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

// fetch ingredients
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    useEffect(() => {
        getIngredients().then((data) => {
            return setIngredients(data);
        });
    }, []);


  // Filtrer les ingrédients en fonction de la recherche
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(query.toLowerCase())
  );

  // Ferme la liste si on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-80 mx-auto mt-5" ref={dropdownRef}>
      {/* Bouton Select */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
      >
        {selectedIngredient ? selectedIngredient : "Sélectionner un ingrédient"}
        <span className="text-gray-600">&#9662;</span> {/* Flèche vers le bas */}
      </button>

      {/* Liste déroulante avec champ de recherche */}
      {isOpen && (
        <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
          <input
            type="text"
            className="w-full px-4 py-2 border-b focus:outline-none"
            placeholder="Recherchez un ingrédient..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setSelectedIngredient(ingredient.id_ingredient);
                    setIsOpen(false);
                    setQuery(""); // Réinitialise la recherche après sélection
                  }}
                >
                  {ingredient.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">Aucun ingrédient trouvé.</li>
            )}
          </ul>
        </div>
        
      )}
    <FavoriteButton id={selectedIngredient} type="ingredient"/>
    </div>
  );
}
