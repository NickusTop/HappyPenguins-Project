const baseUrl = 'https://rickandmortyapi.com/api/character/'

export async function findCharacters() {
  try {
    const response = await fetch(baseUrl + '?page=1')
    const characters = await response.json()
    return characters.results;
  } catch (err) {
    console.log(err);
  }
}