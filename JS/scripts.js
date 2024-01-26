


// Pokemon API

let pokemonRepository = (function () {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


// // Add Image

  var img = document.createElement("img"); 

  img.src = "/IMG/pokequestion.png"; 
  var src = document.getElementById("pokemon-pictures"); 
   
  src.appendChild(img);

// Modal Element

  let modalContainer = document.querySelector('#modal-container');

function showModal(pokemon) {

  // Clear All Exisiting Modal Content

  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add New Modal Content

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener ('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;

  let contentElement = document.createElement('p');
  contentElement.innerText = 'Height: ' + pokemon.height + ' m';

  // Image Container for Modal

  let container = document.querySelector('#image-container');
  let myImage = document.createElement('img');
  myImage.src = pokemon.imageUrl;

  // Append as Last Child of Element

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(myImage);
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');
}

  // Hide Modal Function w/ Escape and Click Outside Container
function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' &&
  modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

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

function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', function() {
    showDetails(pokemon);    
  });
}

  // Make Details Visible in Modal

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
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


return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
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


