const API_KEY = '';
const BASE = 'https://rickandmortyapi.com/api/episode';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const seasonSelect = document.getElementById('seasonSelect');
const episodesGrid = document.getElementById('episodesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const emptyState = document.getElementById('emptyState');

let currentPage = 1;
let lastPage = null;
let currentQuery = '';
let isLoading = false;

// build headers if API_KEY provided
const headers = API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {};

// helper: fetch a page of episodes (with optional name query)
async function fetchEpisodes(page = 1, name = '') {
  const url = new URL(BASE);
  url.searchParams.set('page', page);
  if (name && name.trim() !== '') {
    url.searchParams.set('name', name.trim());
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    // API returns 404 when no results for name filter — we handle it upstream
    if (res.status === 404) {
      return { info: { pages: 0 }, results: [] };
    }
    throw new Error(`HTTP ${res.status}`);
  }
  const json = await res.json();
  return json;
}

// render a single card
function createCard(ep) {
  const card = document.createElement('article');
  card.className = 'card';
  // background placeholder; later можно поставить реальное изображение:
  // card.style.backgroundImage = `url('...')`;
  // add a subtle overlay is already in CSS

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = ep.name;

  const meta = document.createElement('div');
  meta.className = 'meta';
  const seasonWrap = document.createElement('div');
  seasonWrap.className = 'season';
  const seasonLabel = document.createElement('span');
  seasonLabel.style.opacity = '0.65';
  seasonLabel.textContent = 'Season';
  const seasonNum = document.createElement('span');
  seasonNum.style.fontSize = '20px';
  seasonNum.textContent = getSeasonFromCode(ep.episode);

  const air = document.createElement('div');
  air.className = 'airdate';
  air.textContent = new Date(ep.air_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  seasonWrap.appendChild(seasonLabel);
  seasonWrap.appendChild(seasonNum);
  meta.appendChild(seasonWrap);
  meta.appendChild(air);

  card.appendChild(title);
  card.appendChild(meta);

  return card;
}

function getSeasonFromCode(code) {
  // code example: "S01E01" or maybe "S1E1" - safe parse
  const m = String(code).match(/S0?(\d+)/i);
  if (m) return m[1];
  return '-';
}

function clearGrid() {
  episodesGrid.innerHTML = '';
}

// show/hide empty
function showEmpty(show) {
  if (show) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }
}

// render a set of episodes with optional season filter
function renderEpisodes(episodes, seasonFilter = 'all') {
  // If seasonFilter != 'all', only render those episodes with season equal to filter
  const filtered =
    seasonFilter === 'all'
      ? episodes
      : episodes.filter(
          ep => getSeasonFromCode(ep.episode) === String(seasonFilter)
        );
  // append cards
  for (const ep of filtered) {
    const card = createCard(ep);
    episodesGrid.appendChild(card);
  }
}

// stateful load: used for initial load and "load more"
async function loadPage({ page = 1, query = '', reset = false } = {}) {
  if (isLoading) return;
  isLoading = true;
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = 'Loading...';

  try {
    const json = await fetchEpisodes(page, query);
    // info.pages may be undefined if API returned empty results as { results: [] } but we guarded 404
    const pages = json.info && json.info.pages ? json.info.pages : 1;
    lastPage = pages;

    if (reset) {
      clearGrid();
    }

    // season filter current value
    const seasonValue = seasonSelect.value;

    renderEpisodes(json.results || [], seasonValue);

    // If after rendering nothing was shown (either because json.results empty or filtered out) - show empty state
    const hasItemsNow = episodesGrid.children.length > 0;
    if (!hasItemsNow) {
      showEmpty(true);
    } else {
      showEmpty(false);
    }

    // update page counters
    currentPage = page;
    // show/hide load more
    if (currentPage >= lastPage) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'Load more';
    }
  } catch (err) {
    console.error(err);
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = 'Load more';
    // failed fetch: show empty
    if (episodesGrid.children.length === 0) showEmpty(true);
  } finally {
    isLoading = false;
  }
}

// debounce helper
function debounce(fn, wait = 300) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* --- listeners and wiring --- */
const doSearch = debounce(async () => {
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  // reset grid and fetch page 1 with query
  // when using name filter API may return 404 => our fetchEpisodes returns {results:[]}
  clearGrid();
  showEmpty(false);
  await loadPage({ page: 1, query: currentQuery, reset: true });
}, 350);

searchInput.addEventListener('input', doSearch);
searchBtn.addEventListener('click', () => {
  // click forces immediate
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  clearGrid();
  showEmpty(false);
  loadPage({ page: 1, query: currentQuery, reset: true });
});

seasonSelect.addEventListener('change', () => {
  // when changing season, we should re-render but using currently loaded pages may not contain all matches
  // simplest approach: reload from page 1 with current query and append pages using load more
  // we reset grid and refetch page 1.
  currentPage = 1;
  clearGrid();
  showEmpty(false);
  loadPage({ page: 1, query: currentQuery, reset: true });
});

loadMoreBtn.addEventListener('click', async () => {
  if (currentPage >= (lastPage || 1)) return;
  const next = currentPage + 1;
  await loadPage({ page: next, query: currentQuery, reset: false });
});

/* init */
(async function init() {
  await loadPage({ page: 1, query: '', reset: true });
})();
