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

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
        'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct')
        }
      }

    function getAll() {
        return pokemonList;
      }
    
    return {
        add: add,
        getAll: getAll
      };
    })();

console.log(pokemonRepository.getAll())
console.log(pokemonRepository.add({name: 'Koffing'}));


pokemonRepository.getAll().forEach(function (item) {
    document.write('Name: ' + item.name + '<br>' + 'Type: ' + item.type + '<br>' + 'Height: ' + item.height + '<br>' + 'Weight: ' + item.weight + '<br>' + 'Abilities: ' + item.abilities + '<br>' + 'HP: ' + item.hp);{
        document.write('<br>');
        document.write('<br>');
    }})
