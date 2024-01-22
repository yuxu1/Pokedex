let pokemonRepository = (function () {
    //array of Pokemon;will put data fetched from API here
    let pokemonList = [];
    //retrieve pokemon data from API
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    //retrieve whole list of Pokemon
    function getAll() {
        return pokemonList;
    }

    //add Pokemon entry to list
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is invalid');
        }
    }

    //add a button for each addition to the Pokemon list
    function addListItem(pokemon) {
        let listedEntries = document.querySelector('.pokemon-list');
        let pokemonEntry = document.createElement('button');
        pokemonEntry.classList.add('pokemon-button','list-group-item', 'list-group-item-action');
        pokemonEntry.innerText = pokemon.name;
        pokemonEntry.setAttribute('data-toggle', 'modal');
        pokemonEntry.setAttribute('data-target', '.modal');
        //append button to list item
        listedEntries.appendChild(pokemonEntry);

        //if button is clicked, show details of selected Pokemon
        pokemonEntry.addEventListener('click', () => showDetails(pokemon));
    }

    //fetch data from API & load into pokemonList
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            //calls results key from json data;create a pokemon variable for each item as object w/ 2 keys
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //loads details of Pokemon from fetched API data, with Pokemon object as parameter
    function loadDetails(item) {
        //refers to detailsUrl key of pokemon object in loadList function
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //assign details from response to the Pokemon in pokemonList
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //execute loadDetails() onto a modal when user clicks on a Pokemon's button
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            //empty contents of modal before loading new selection
            let modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML='';

            //set title of modal to be Pokemon's name
            let titleElement = document.querySelector('.modal-title');
            titleElement.innerText = pokemon.name;

            //show front image of Pokemon
            let imageElement = document.createElement('img');
            imageElement.src = pokemon.imageUrl;
            imageElement.alt = 'image of ' +pokemon.name;
            imageElement.classList.add('img-fluid');

            //show height of Pokemon
            let heightElement = document.createElement('p');
            heightElement.innerText = 'Height: ' + pokemon.height;

            //show weight of Pokemon
            let weightElement = document.createElement('p');
            weightElement.innerText = 'Weight: ' + pokemon.weight;

            //show type(s) of the selected Pokemon
            let typesElement = document.createElement('p'); 
            let typesList=[];  
            //retrieve name of "types" for each Pokemon into new array
            pokemon.types.forEach((item) =>{
                typesList.push(item.type.name);
            })
            typesElement.innerText = 'Type(s): ' + typesList;
            
            //append the selected Pokemon details to modal body
            modalBody.appendChild(imageElement);
            modalBody.appendChild(heightElement);
            modalBody.appendChild(weightElement);
            modalBody.appendChild(typesElement);
        });
    }

    //search function to filter Pokemon (in-progress)
    let searchBar = document.querySelector('#search-bar');
    //live-search when input starts in search bar
    searchBar.addEventListener('keyup',(input)=> searchPokemon(input));
    function searchPokemon(input){
        //take user input and converts to lowercase
        let inputValue = input.target.value.toLowerCase();

        //go through Pokemon list and check if each name has the inputted value
        document.querySelectorAll('.pokemon-list').forEach(function(pokemon){
            //display the ones that match and hide the ones that don't
            if(loadList(pokemon).name.indexOf(inputValue) !== -1) {
                pokemon.style.display='block';
            }else{
                pokemon.style.display='none';
            }
        });

    }

    //return functions as keys to object pokemonRepository
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

//load data from API into pokemonRepository
pokemonRepository.loadList().then(function () {
    //add each pokemon in pokemonRepository into <ul> .pokemon-list
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
