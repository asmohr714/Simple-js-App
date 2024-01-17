


let pokemonRepository = (function () {

let pokemonList = [

    {
        name: 'Koffing',
        type: 'Poison', 
        height: 0.6,
        weight: 1,
        abilities: 'Levitate', 
        hp: 40
    },
    {
        name: 'Physduck',
        type: 'Water',
        height: 0.8,
        weight: 19.6,
        abilities: ['Damp',' Cloud-nine',' Swift-swim'],
        hp: 50
    },
    {
        name: 'Abra',
        type: 'Psychic', 
        height: 0.9,
        weight: 19.5,
        abilities: ['Synchronize', ' Inner-focus', ' Magic-guard'],
        hp: 25
    },
    {
        name: 'Caterpie',
        type: 'Bug',
        height: 0.3,
        weight: 2.9,
        abilities: ['Shield-dust', ' Run-away'],
        hp: 45,
    },
    {
        name: 'Pidgey',
        type: ['Flying',' Normal'],
        height: .03,
        weight: 1.8,
        abilities: ['Keen-eye', ' Tangled-feet'],
        hp: 40,
    }]

// Add Pokemon to List

function add(pokemon) {
    if (typeof pokemon === 'object' &&
    'name' in pokemon) {
        pokemonList.push(pokemon);
    } else {
        console.log('Pokemon is not correct')
    }
}

// Return the Array of Pokemon

function getAll() {
    return pokemonList;
}

// Function to Create Pokemon buttons

function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', showDetails)
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
}

function showDetails(e) {
    if (e.target.matches('button')) {
      console.log(e.target.innerText);
    }
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
    };

})();

// Print List of Pokemon

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

});


