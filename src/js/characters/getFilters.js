export function getFilters() {
    const toLower = (str) => (str || '').toLowerCase();

    return {
        selectedStatus: toLower(localStorage.getItem('selectedStatus') || 'All'),
        selectedSpecies: toLower(localStorage.getItem('selectedSpecies') || 'All'),
        selectedType: toLower(localStorage.getItem('selectedType') || 'All'),
        selectedGender: toLower(localStorage.getItem('selectedGender') || 'All'),
        selectedName: toLower(localStorage.getItem('selectedName') || ''),
        toLower
    };
}
