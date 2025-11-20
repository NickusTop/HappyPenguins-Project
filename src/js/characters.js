import { findCharacters } from "./characters/findCharacters.js"
import { renderCharacters } from "./characters/renderCharacters.js"

const selectButtons = document.querySelectorAll('.select-btn');
const selectUls = document.querySelectorAll('.select-ul');
const charactersList = document.querySelector('.characters-ul');
const loadMorebtn = document.querySelector('.loadmore-btn');

let pageList = 1;

async function loadCharacters() {
  const characters = await findCharacters(pageList);
  renderCharacters(charactersList, characters);
}

loadMorebtn.addEventListener('click', async () => {
  loadMorebtn.disabled = true;
  pageList++;
  await loadCharacters();
  loadMorebtn.disabled = false;
});


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

loadCharacters();
