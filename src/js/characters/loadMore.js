import { getFilters } from "./getFilters.js";
import { createCharacterFilter } from "./createCharacterFilter.js";
import { loadAndFilterPages } from "./loadAndFilterPages.js";
import { renderCharacters } from "./renderCharacters.js";
import { updateLoadMoreVisibility } from "./updateLoadMore.js";

export async function loadMoreCharacters(state) {
    const { charactersList, loadMorebtn, filteredCharacters, countLoad } = state;

    loadMorebtn.disabled = true;

    const params = getFilters();
    const filterFn = createCharacterFilter(params);

    let loaded = 0;

    const { finalPage } = await loadAndFilterPages(filterFn, countLoad, state.pageList, (matched) => {
        if (matched.length === 0) return true;

        const renderNow = matched.slice(0, countLoad - loaded);
        renderCharacters(charactersList, renderNow, 0, renderNow.length, false);

        loaded += renderNow.length;

        state.filteredCharacters = state.filteredCharacters.concat(matched);

        return loaded < countLoad;
    });

    state.pageList = finalPage;
    loadMorebtn.disabled = false;

    await updateLoadMoreVisibility(state);
}
