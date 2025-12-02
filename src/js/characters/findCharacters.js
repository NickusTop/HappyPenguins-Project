const baseUrl = 'https://rickandmortyapi.com/api/character/'

export async function findCharacters(pageList) {
  try {
    const response = await fetch(baseUrl + `?page=${pageList}`)
    const characters = await response.json()
    console.log(characters);
    
    return characters.results;
  } catch (err) {
    console.log(err);
  }
}