//wrap list of Pokemon in an IIFE
let pokemonRepository = (function () {
    //list of Pokemon-empty;will put data fetched from API here
    let pokemonList = [];
    //retrieve pokemon data from here
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    //retrieve whole list of Pokemon
    function getAll() {
        return pokemonList;
    }

    //add Pokemon entry to list
    function add(pokemon) {
        if(typeof pokemon==='object' && 'name' in pokemon){
            pokemonList.push(pokemon);
        }else{
            console.log('pokemon is invalid');
        }
    }

    //function to add a button for each addition to the list of Pokemon
    function addListItem(pokemon) {
        let listedEntries = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        //create button element for each Pokemon entry
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        //appends button to list item as its child
        listItem.appendChild(button);
        //appends list item to unodered list as its child
        listedEntries.appendChild(listItem);
        //if button is clicked, show details of selected Pokemon
        button.addEventListener('click', () => showDetails(pokemon));
    }

    //fetch data from API & add fetched data to pokemonList w/ add()
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

    //execute loadDetails() when user clicks on a Pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //show modal of Pokemon details
    function showModal(pokemon) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //button to close modal
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        //content of modal
        let titleElement = document.createElement('h2');
        titleElement.innerText = pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: '+ pokemon.height;

        let imageElement = documement.createElement('img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = 'image of' + pokemon.name;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //if ESC key pressed, closes modal if modal is open
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

    //if click modalContainer outside modal, closes modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    })

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
