import { findCharacters } from "./findCharacters.js";

export async function loadAndFilterPages(filter, maxResults, startPage, onPageLoaded) {
    let currentPage = startPage;
    let results = [];
    let go = true;

    while (go && results.length < maxResults) {
        let characters;

        try {
            characters = await findCharacters(currentPage);
        } catch {
            break;
        }

        if (!characters || characters.length === 0) break;

        const matched = characters.filter(filter);
        const pageLoad = onPageLoaded(matched, currentPage);

        const need = maxResults - results.length;
        results = results.concat(matched.slice(0, need));

        currentPage++;

        if (pageLoad === false || currentPage > 42) go = false;
    }

    return { results, finalPage: currentPage };
}
