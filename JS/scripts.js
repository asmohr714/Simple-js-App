


// IIFE Pokemon Repository API and Functions

let pokemonRepository = (function () {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// Modal Container

let modalContainer = document.querySelector('.modal-container');

function showModal(pokemon) {
   let modal = document.createElement('div');
   modal.classList.add('modal');

  // Close Button

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('button-class');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  // Modal Content

  let titleElement = document.createElement('h1');
  titleElement.innerText = 'Pokemon name' + ':' + pokemon.name;

  let contentElement = document.createElement('p');
  contentElement.innertext = 'Pokemon height' + ':' + pokemon.height +'m';

  let imageElement = document.createElement('img');
  imageElement.src = pokemon.imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');
}

// Close Modal Function

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
  }
  
  // Keyboard Close Modal
  
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
    }
  });

// Close On 'Click' Outside Modal

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});




// Add Pokemon to List

function add(pokemon) {
  if (
  typeof pokemon === 'object' &&
  'name' in pokemon
   ) {
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

// function addListItem(pokemon){
//   let element = document.querySelector('.pokemon-list');
//   let listItem = document.createElement('li');
//   let button = document.createElement('button');
//   button.innerText = pokemon.name;
//   button.classList.add('button-class');
//   listItem.appendChild(button);
//   element.appendChild(listItem);
//    button.addEventListener('click', () => {
//      showDetails(pokemon);    
//    });

   function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(Event) {
      showModal(pokemon);    
    });
}

// Fetch Pokemon Items from API

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
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

// Fetch Pokemon Details from API

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

function add(pokemon) {
  pokemonList.push(pokemon);
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
      showModal(pokemon);
  });
}

return {
  add: add,
  getAll: getAll,
  ListItem: ListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
};
})();

// Print List of Pokemon

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);

});
});


// Add Image to Main

// var img = document.createElement("img"); 

// img.src = "/IMG/pokequestion.png"; 
// var src = document.getElementById("pokemon-pictures"); 

// src.appendChild(img);
