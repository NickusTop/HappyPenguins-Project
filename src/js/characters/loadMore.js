import { getFilters } from "./getFilters.js";
import { createCharacterFilter } from "./createCharacterFilter.js";
import { loadAndFilterPages } from "./loadAndFilterPages.js";
import { renderCharacters } from "./renderCharacters.js";
import { updateLoadMoreVisibility } from "./updateLoadMore.js";

export async function loadMoreCharacters(state) {
    const { charactersList, loadMorebtn } = state;

    const loader = document.querySelector(".characters-loader");

    loadMorebtn.disabled = true;
    loader.classList.add("active");

    // 🟡 СКРЫВАЕМ СПИСОК (как loadFilteredCharactersWithLoader)
    charactersList.style.opacity = "0";

    // 🟡 НЕБОЛЬШАЯ ЗАДЕРЖКА, чтобы анимация лоадера успела сработать
    await new Promise(res => setTimeout(res, 150));

    const params = getFilters();
    const filterFn = createCharacterFilter(params);

    let loaded = 0;

    const { finalPage } = await loadAndFilterPages(
        filterFn,
        state.countLoad,
        state.pageList,
        (matched) => {
            if (matched.length === 0) return true;

            const renderNow = matched.slice(0, state.countLoad - loaded);
            renderCharacters(charactersList, renderNow, 0, renderNow.length, false);

            loaded += renderNow.length;
            state.filteredCharacters = state.filteredCharacters.concat(matched);

            return loaded < state.countLoad;
        }
    );

    state.pageList = finalPage;

    await updateLoadMoreVisibility(state);

    loadMorebtn.disabled = false;
    loader.classList.remove("active");

    // 🟢 ПОКАЗЫВАЕМ СПИСОК ОБРАТНО
    charactersList.style.opacity = "1";
}
