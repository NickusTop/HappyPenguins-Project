import { getFilters } from "./getFilters.js";
import { createCharacterFilter } from "./createCharacterFilter.js";
import { loadAndFilterPages } from "./loadAndFilterPages.js";
import { renderCharacters } from "./renderCharacters.js";
import { updateLoadMoreVisibility } from "./updateLoadMore.js";

export async function loadFilteredCharacters(state) {
    const { charactersList, filteredCharacters, loadMorebtn, noCharacters, countLoad } = state;

    charactersList.innerHTML = "";
    state.nextIndex = 0;
    state.pageList = 1;
    filteredCharacters.length = 0;

    const params = getFilters();
    const filterFn = createCharacterFilter(params);

    const { results, finalPage } = await loadAndFilterPages(filterFn, countLoad, state.pageList, () => true);

    state.filteredCharacters = results;
    state.pageList = finalPage;

    if (results.length === 0) {
        loadMorebtn.style.display = "none";
        noCharacters.style.display = "flex";
    } else {
        loadMorebtn.style.display = "block";
        noCharacters.style.display = "none";
    }

    renderCharacters(charactersList, results.slice(0, countLoad), 0, countLoad, true);

    state.nextIndex = countLoad;

    await updateLoadMoreVisibility(state);
}
