//wrap list of Pokemon in an IIFE
let pokemonRepository = (function () {
    //list of Pokemon-empty;will put data fetched from API here
    let pokemonList = [];
    //retrieve pokemon data from here
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //retrieve whole list of Pokemon
    function getAll() {
        return pokemonList;
    }

    //add Pokemon entry to list
    function add(pokemon) {
        pokemonList.push(pokemon);
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

    //fetch data from API & add fetched data to pokemonList w/ add()
    function loadList(){
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            //calls results key from json data;create a pokemon variable for each item as object w/ 2 keys
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }

    //loads details of Pokemon from fetched API data, with Pokemon object as parameter
    function loadDetails(item){
        //refers to detailsUrl key of pokemon object in loadList function
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            //assign details from response to the Pokemon in pokemonList
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        });
    }

    //execute loadDetails() when user clicks on a Pokemon
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
    }
    //return functions as keys to object pokemonRepository
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

//load data from API into pokemonRepository
pokemonRepository.loadList().then(function(){
    //add each pokemon in pokemonRepository into <ul> .pokemon-list
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
