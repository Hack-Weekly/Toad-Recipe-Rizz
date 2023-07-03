export async function GET() {
  // fetch the API and return the response as JSON
  const response = await fetch('http://recipes.eerieemu.com/api/recipe/?page=1');
  const recipes = await response.json();
  return {
    body: recipes
  };
}