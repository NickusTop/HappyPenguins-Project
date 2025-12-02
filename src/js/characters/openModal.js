function removeParentheses(str) {
    return str ? str.replace(/\s*\(.*?\)/g, '').trim() : str;
}
export async function openCharacterModal(character, modal) {
    const modalImg = modal.querySelector('.menu-img');
    const modalStatus = modal.querySelector('.menu-status');
    const modalSpecies = modal.querySelector('.menu-species');
    const modalGender = modal.querySelector('.menu-gender');
    const modalOrigin = modal.querySelector('.menu-origin');
    const modalLocation = modal.querySelector('.menu-location');
    const modalType = modal.querySelector('.menu-type');

    modal.classList.add('active');

    modalImg.src = character.image;
     modalStatus.textContent = removeParentheses(character.status) || 'Unknown';
    modalSpecies.textContent = removeParentheses(character.species) || 'Unknown';
    modalGender.textContent = removeParentheses(character.gender) || 'Unknown';
    modalOrigin.textContent = removeParentheses(character.origin?.name) || 'Unknown';
    modalLocation.textContent = removeParentheses(character.location?.name) || 'Unknown';
    modalType.textContent = removeParentheses(character.type) || 'None';

    const episodesContainer = modal.querySelector('.menu-container-episodes');
    if (!episodesContainer) return;

    episodesContainer.innerHTML = '';

    if (!character.episode || character.episode.length === 0) {
        episodesContainer.insertAdjacentHTML(
            'beforeend',
            '<p class="menu-container-p"></p>'
        );
        return;
    }

    const episodePromises = character.episode.map(url =>
        fetch(url)
            .then(res => (res.ok ? res.json() : null))
            .catch(() => null)
    );

    try {
        const episodesData = await Promise.all(episodePromises);

        for (const epData of episodesData) {
            if (!epData) continue;

            const episodeName = epData.name;
            const airDate = epData.air_date;

            const displayEpisodeName =
                episodeName.length > 7 ? episodeName.slice(0, 7) + '...' : episodeName;

            const match = epData.episode.match(/S(\d+)E(\d+)/);
            const season = match ? match[1] : '??';

            const episodeUl = document.createElement('ul');
            episodeUl.classList.add('menu-container-ul', 'menu-episodes-ul');

            episodeUl.innerHTML = `
                <h4 class="menu-h4" title="${episodeName}">${displayEpisodeName}</h4>
                <li class="menu-container-li menu-container-ep-li">
                    <p class="menu-container-p">Season</p>
                    <span class="menu-container-span">${season}</span>
                </li>
                <li class="menu-container-li">
                    <p class="menu-container-p">Air date</p>
                    <span class="menu-container-span">${airDate}</span>
                </li>
            `;

            episodesContainer.appendChild(episodeUl);
        }
    } catch {}
}
