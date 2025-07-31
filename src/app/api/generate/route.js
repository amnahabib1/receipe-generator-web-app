export async function POST(req) {
  const { ingredients } = await req.json();

  try {
    const response = await fetch('https://amnahabib.app.n8n.cloud/webhook/recipe-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();

    // Attempt to parse the recipe content into an object
    let recipe = data.message?.content;

    // If it's a stringified JSON (from n8n/AI), parse it
    if (typeof recipe === 'string') {
      try {
        recipe = JSON.parse(recipe);
      } catch {
        // fallback to string if it's not a valid JSON
      }
    }

    return Response.json({ recipe });

  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { recipe: 'Error generating recipe. Please try again later.' },
      { status: 500 }
    );
  }
}
