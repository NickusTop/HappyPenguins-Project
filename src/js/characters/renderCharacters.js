import { findCharacters } from './findCharacters.js';

export function renderCharacters(charactersList, characters) {
  const html = characters.map(character => {
    return `
      <ul class="character-ul">
        <img src="${character.image}" alt="" class="character-img">
        <h2 class="character-h2">${character.name}</h2>
        <p class="character-p">Origin: <span class="character-span">${character.origin.name}</span></p>
        <p class="character-p">Location: <span class="character-span">${character.location.name}</span></p>
      </ul>
    `;
  }).join("");

  charactersList.insertAdjacentHTML("beforeend", html);
}

