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
        abilities: ['Damp','Cloud-nine','Swift-swim'],
        hp: 50
    },
    {
        name: 'Abra',
        type: 'Psychic', 
        height: 0.9,
        weight: 19.5,
        abilities: ['Synchronize', 'Inner-focus', 'Magic-guard'],
        hp: 25
    },
    {
        name: 'Caterpie',
        type: 'Bug',
        height: 0.3,
        weight: 2.9,
        abilities: ['Shield-dust', 'Run-away'],
        hp: 45,
    },
    {
        name: 'Pidgey',
        type: ['Flying','Normal'],
        height: .03,
        weight: 1.8,
        abilities: ['Keen-eye','Tangled-feet'],
        hp: 40,
    }]


    for (let i=0; i<pokemonList.length; i++) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
        if (pokemonList[i].height <= 0.5) {
        document.write('<br>');
        }
        else{
            document.write('That\'s a big Pokemon!');
            document.write('<br>');
        }
        }