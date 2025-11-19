import { findCharacters } from "./characters/findCharacters.js"
import { renderCharcters } from "./characters/renderCharacters.js"

const selectButtons = document.querySelectorAll('.select-btn');
const selectUls = document.querySelectorAll('.select-ul');
const charactersDiv = document.querySelector('.characterspages-div')

selectButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const ul = btn.nextElementSibling;
    if (ul && ul.classList.contains('select-ul')) {
      selectUls.forEach(otherUl => {
        if (otherUl !== ul) {
          otherUl.classList.remove('active');
        }
      });
      ul.classList.toggle('active');
    }
  });
});

async function showCharacters() {
  const characters = await findCharacters();
  console.log(characters);
  return characters;
}

showCharacters();

renderCharcters(charactersDiv)
