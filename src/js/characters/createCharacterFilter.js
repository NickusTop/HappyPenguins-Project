export function createCharacterFilter(params) {
    return function(character) {
        const { selectedStatus, selectedSpecies, selectedType, selectedGender, selectedName, toLower } = params;

        const charStatus = toLower(character.status);
        const charSpecies = toLower(character.species);
        const charType = toLower(character.type);
        const charGender = toLower(character.gender);
        const charName = toLower(character.name);

        return (
            (selectedStatus === 'all' || charStatus === selectedStatus) &&
            (selectedSpecies === 'all' || charSpecies === selectedSpecies) &&
            (selectedType === 'all' || charType === selectedType) &&
            (selectedGender === 'all' || charGender === selectedGender) &&
            (selectedName.length < 3 || charName.includes(selectedName))
        );
    };
}
