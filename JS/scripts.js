


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

  // Function to filter pokemons by name
  function filterByName(name) {
    let containerElement = document.querySelector('.row');
    let pokemonNames = pokemonList.map(item => item.name);

    pokemonNames.forEach((element) => {
        let containerChild = document.querySelector(`[id=${element}]`);
        if (containerChild) {
         if (!element.match(name)) {
           containerElement.removeChild(containerChild);
         }
        }
    });
}

// // Function to Create Pokemon buttons

// function addListItem(pokemon){
//   let pokemonList = document.querySelector('.pokemon-list');
//   let listpokemon = document.createElement('li');
//   let button = document.createElement('button');
//   button.innerText = pokemon.name;
//   button.classList.add('button-class');
//   listpokemon.appendChild(button);
//   pokemonList.appendChild(listpokemon);
//   button.addEventListener('click', function() {
//     showDetails(pokemon);    
//   });
// }

  // Create Pokemon Buttons List  
  function addListItem(pokemon) {
    let pokemonAddList = document.querySelector('.row');
    let divElement = document.createElement('div');
    pokemonAddList.appendChild(divElement);
    divElement.classList.add('list-group-item','col-12','col-sm-6','col-md-4','col-lg-4');
    divElement.id = pokemon.name;

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute('data-id', i++);
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');  
    divElement.appendChild(button);
    button.classList.add('btn','btn-lg','btn-block', 'list-btn');
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

$('#exampleModal').on('show.bs.modal', function(event) {
  let pokemonID = event.relatedTarget.dataset.id;
  showDetails(pokemonList[pokemonID]);
});

$('#searchItem').on('change input', function(event) {
  let inputText = $('#searchItem').val();
  filterByName(inputText);
});

// Print List of Pokemon

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);

});
});


