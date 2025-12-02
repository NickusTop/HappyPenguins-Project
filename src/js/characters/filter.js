export function filterCharacters(
  selectUlstatus,
  selectUlspecies,
  selectUltype,
  selectUlgender,
  statusText,
  speciesText,
  typeText,
  genderText,
  selectUls,
  loadFilteredCharacters
) {
  const setupFilter = (selectLis, localStorageKey, textElement) => {
    selectLis.forEach(li => {
      li.addEventListener('click', () => {
        selectLis.forEach(otherLi => {
          otherLi.removeAttribute('name');
          otherLi.classList.remove('active');
        });
        selectUls.forEach(ul => ul.classList.remove('active'));
        const selectedValue = li.textContent.trim();
        li.setAttribute('name', selectedValue);
        li.classList.add('active');
        textElement.textContent = selectedValue;
        localStorage.setItem(localStorageKey, selectedValue);
        loadFilteredCharacters();
      });
    });
  };

  setupFilter(selectUlstatus, 'selectedStatus', statusText);
  setupFilter(selectUlspecies, 'selectedSpecies', speciesText);
  setupFilter(selectUltype, 'selectedType', typeText);
  setupFilter(selectUlgender, 'selectedGender', genderText);
}
