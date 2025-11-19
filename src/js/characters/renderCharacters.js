import { findCharacters } from './findCharacters.js';

export async function renderCharcters(charactersDiv) {
  try {
    const characters = await findCharacters();
    charactersDiv.innerHTML = characters.map(character => {
      return `
            <ul class="character-ul">
      <img src="${character.image}" alt="" class="character-img">
      <h2 class="character-h2">${character.name}</h2>
      <p class="character-p">Origin: <span class="character-span">${character.origin.name}</span></p>
      <p class="character-p">Location: <span class="character-span">${character.location.name}</span></p>
    </ul>
            `;
    })
    .join("")
  } catch (err) {
    console.log(err);
  }
}
