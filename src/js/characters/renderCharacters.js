export function renderCharacters(
    charactersList,
    characters,
    start = 0,
    count = 20,
    reset = false
) {
    if (reset) charactersList.innerHTML = '';

    const charactersToRender = characters.slice(start, start + count);

    const htmlContent = charactersToRender
        .map(char => {
            if (!char) return '';
            const episodeData = JSON.stringify(char.episode || []); 

            return `
            <ul class="character-ul"
                data-image="${char.image}"
                data-status="${char.status}"
                data-species="${char.species}"
                data-gender="${char.gender}"
                data-origin="${char.origin.name}"
                data-location="${char.location.name}"
                data-type="${char.type || ''}"
                data-episode='${episodeData}'>
                
                <img src="${char.image}" alt="" class="character-img">
                <h2 class="character-h2">${char.name}</h2>
                <p class="character-p">Origin: <span class="character-span">${char.origin.name}</span></p>
                <p class="character-p">Location: <span class="character-span">${char.location.name}</span></p>
            </ul>
            `;
        })
        .join('');

    charactersList.insertAdjacentHTML('beforeend', htmlContent);

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const newElements = charactersList.querySelectorAll(".character-ul");
    newElements.forEach(el => observer.observe(el));

    return charactersToRender.length;
}
