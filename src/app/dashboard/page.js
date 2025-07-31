'use client';
import { useState } from 'react';

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });

    const data = await res.json();
    setRecipe(data.recipe);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#1a2a4f] text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">ChefBotics</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-4"
      >
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., chicken, tomato)"
          className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold transition duration-300"
        >
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </form>

      {recipe && (
        <div className="mt-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl font-semibold mb-2">{recipe.recipe_name}</h2>
          <p className="italic mb-4">{recipe.description}</p>

          <div className="space-y-1 mb-4">
            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>
            <p>
              <strong>Prep Time:</strong> {recipe.prep_time}
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cook_time}
            </p>
            <p>
              <strong>Total Time:</strong> {recipe.total_time}
            </p>
          </div>

          <h3 className="font-semibold text-lg">Ingredients:</h3>
          <ul className="list-disc ml-5 mb-4">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg">Instructions:</h3>
          <ol className="list-decimal ml-5 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {recipe.notes && (
            <>
              <h3 className="font-semibold text-lg mt-4">Notes:</h3>
              <p>{recipe.notes}</p>
            </>
          )}
        </div>
      )}
    </main>
  );
}
