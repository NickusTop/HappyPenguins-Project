import { renderCharacters } from './characters/renderCharacters.js';
import { filterCharacters } from './characters/filter.js';

import { loadFilteredCharacters } from './characters/loadFiltered.js';
import { loadMoreCharacters } from './characters/loadMore.js';
import { openCharacterModal } from './characters/openModal.js';

const selectButtons = document.querySelectorAll('.select-btn');
const selectUls = document.querySelectorAll('.select-ul');
const charactersList = document.querySelector('.characters-ul');
const loadMorebtn = document.querySelector('.loadmore-btn');
const nameInput = document.querySelector('.filter-input');
const nameInputHeader = document.querySelector('.header-input');
const noCharacters = document.querySelector('.nocharacters-ul');
const modal = document.querySelector('.overflow-menu');

let selectUlstatus = document.querySelectorAll('.select-ul-status li');
let selectUlspecies = document.querySelectorAll('.select-ul-species li');
let selectUltype = document.querySelectorAll('.select-ul-type li');
let selectUlgender = document.querySelectorAll('.select-ul-gender li');

let statusText = document.querySelector('.status-text');
let speciesText = document.querySelector('.species-text');
let typeText = document.querySelector('.type-text');
let genderText = document.querySelector('.gender-text');

const modalCloseBtn = modal.querySelector('.menu-btn');

let state = {
  nextIndex: 0,
  countLoad: 20,
  pageList: 1,
  filteredCharacters: [],
  charactersList,
  loadMorebtn,
  noCharacters,
};

function handleNameInput(value) {
  let v = value.trim().toLowerCase();
  if (v.length < 3) {
    localStorage.setItem('selectedName', '');
  } else {
    localStorage.setItem('selectedName', v);
  }
  loadFilteredCharacters(state);
}

nameInput.addEventListener('input', () => {
  handleNameInput(nameInput.value);
  nameInputHeader.value = nameInput.value;
});

nameInputHeader.addEventListener('input', () => {
  handleNameInput(nameInputHeader.value);
  nameInput.value = nameInputHeader.value;
});

charactersList.addEventListener('click', e => {
  const ul = e.target.closest('.character-ul');
  if (!ul) return;

  let eps = [];
  try {
    eps = JSON.parse(ul.dataset.episode);
  } catch {}

  const character = {
    image: ul.dataset.image,
    status: ul.dataset.status,
    species: ul.dataset.species,
    gender: ul.dataset.gender,
    origin: { name: ul.dataset.origin },
    location: { name: ul.dataset.location },
    type: ul.dataset.type,
    episode: eps,
  };

  openCharacterModal(character, modal);
});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

function menuDown() {
  selectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let ul = btn.nextElementSibling;
      selectButtons.forEach(otherBtn => {
        let otherUl = otherBtn.nextElementSibling;
        if (otherUl && otherUl !== ul) {
          otherUl.classList.remove('active');
        }
      });
      if (ul) ul.classList.toggle('active');
    });
  });
}

function start() {
  localStorage.setItem('selectedStatus', 'All');
  localStorage.setItem('selectedSpecies', 'All');
  localStorage.setItem('selectedType', 'All');
  localStorage.setItem('selectedGender', 'All');

  menuDown();

  filterCharacters(
    selectUlstatus,
    selectUlspecies,
    selectUltype,
    selectUlgender,
    statusText,
    speciesText,
    typeText,
    genderText,
    selectUls,
    () => loadFilteredCharacters(state)
  );

  loadMorebtn.addEventListener('click', () => loadMoreCharacters(state));

  loadFilteredCharacters(state);
}

start();
