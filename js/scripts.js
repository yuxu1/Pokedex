//wrap list of Pokemon in an IIFE
let pokemonRepository = (function () {
    //list of Pokemon
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['grass', 'poison'] },
        { name: 'Ivysaur', height: 1.0, weight: 13.0, types: ['grass', 'poision'] },
        { name: 'Venusaur', height: 2.0, weight: 100.0, types: ['grass', 'poison'] },
        { name: 'Charmander', height: 0.6, weight: 8.5, types: 'fire' },
        { name: 'Charmeleon', height: 1.1, weight: 19.0, types: 'fire' },
        { name: 'Charizard', height: 1.7, weight: 90.5, types: ['fire', 'flying'] },
        { name: 'Squirtle', height: 0.5, weight: 9.0, types: 'water' },
        { name: 'Wartortle', height: 1.0, weight: 22.5, types: 'water' },
        { name: 'Blastoise', height: 1.6, weight: 85.5, types: 'water' }
    ];

    //retrieve whole list of Pokemon
    function getAll() {
        return pokemonList;
    }

    //add Pokemon entry to list when the data meets the format
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'weight' in pokemon &&
            'types' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon data invalid or incomplete');
        }
    }

    //function to add a button for each addition to the list of Pokemon
    function addListItem(pokemon) {
        let listedEntries = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        //create button element for each Pokemon entry
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('list-entry');
        //appends button to list item as its child
        listItem.appendChild(button);
        //appends list item to unodered list as its child
        listedEntries.appendChild(listItem);
        //add event listener to button created-hear for 'click' and show details of selected Pokemon
        button.addEventListener('click',()=>showDetails(pokemon));
    }
    //print Pokemon's name to console when activated
    function showDetails(pokemon){
        console.log(pokemon.name);
    }

    //return functions as keys to object pokemonRepository
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();

//add each pokemon in pokemonRepository into <ul> .pokemon-list
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
