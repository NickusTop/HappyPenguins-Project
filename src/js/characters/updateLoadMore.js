import { findCharacters } from "./findCharacters.js";
import { getFilters } from "./getFilters.js";
import { createCharacterFilter } from "./createCharacterFilter.js";

export async function updateLoadMoreVisibility(state) {
    const { loadMorebtn } = state;

    if (state.pageList > 42) {
        loadMorebtn.style.display = "none";
        return;
    }

    const next = await findCharacters(state.pageList);
    if (!next) {
        loadMorebtn.style.display = "none";
        return;
    }

    const params = getFilters();
    const filterFn = createCharacterFilter(params);

    const matched = next.filter(filterFn);
    loadMorebtn.style.display = matched.length === 0 ? "none" : "block";
}
