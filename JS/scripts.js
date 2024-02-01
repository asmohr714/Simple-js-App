


// Pokemon API

let pokemonRepository = (function () {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Modal Element

 let modal = document.querySelector('.modal')

function showModal(pokemon) {
  let modalContent = document.querySelector('.modal-content');
  let modalBody = document.querySelector('.modal-body');
  let modalTitle = document.querySelector('.modal-title');
  let modalHeader = document.querySelector('.modal-header');


  // Clear All Exisiting Modal Content

  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';

  // Add New Modal Content

  // let closeButtonElement = document.createElement('button');
  // closeButtonElement.classList.add('modal-close');
  // closeButtonElement.innerText = 'Close';
  // closeButtonElement.addEventListener ('click', hideModal);

  let nameElement = document.createElement('h1');
  var capitalizedName = pokemon.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  nameElement.innerHTML = capitalizedName;

  let typesElement = document.createElement('p');
  let types = [pokemon.types[0].type.name];
  for (let i = 1; i < pokemon.types.length; i++) {
    types.push(', ' + pokemon.types[i].type.name);
  }
  typesElement.innerHTML = 'Types: ' + types.join('');

  let heightElement = document.createElement('p');
  heightElement.innerText = 'Height: ' + pokemon.height + ' m';

  let weightElement = document.createElement('p');
  weightElement.innerText = 'Weight: ' + pokemon.weight + ' kg';

  // Image Container for Modal

  let imageFront = document.createElement('img');
  imageFront.classList.add('modal-img');
  imageFront.src = pokemon.imageUrlFront;
  imageFront.alt = 'Front image of ' + pokemon.name;

  let imageBack = document.createElement('img');
  imageBack.classList.add('modal-img');
  imageBack.src = pokemon.imageUrlBack;
  imageBack.alt = 'Back image of ' + pokemon.name;

  // Append as Last Child of Element

  modalTitle.appendChild(nameElement);
  // modalHeader.appendChild(closeButtonElement);
  modalBody.appendChild(imageFront);
  modalBody.appendChild(imageBack);
  modalBody.appendChild(typesElement);
  modalBody.appendChild(heightElement);
  modalBody.appendChild(weightElement);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);

}

  // Hide Modal Function w/ Escape and Click Outside Container

function hideModal() {
  modal.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' &&
  modal.classList.contains('is-visible')) {
    hideModal();
  }
});

modal.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modal) {
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

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.list-group');
  let li = document.createElement('li');
  li.classList.add('list-group-item')
  pokemonList.appendChild(li);

  let button = document.createElement('button');
  button.innerHTML = pokemon.name;
  li.appendChild(button);
  button.classList.add('btn', 'btn-success');
  button.setAttribute('data-target', '#exampleModal');
  button.setAttribute('data-toggle', 'modal');
  addEventListenerToButton(button, pokemon)
}
function addEventListenerToButton(button, pokemon) {
  button.addEventListener('click', function() {
    showDetails(pokemon);
  })
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
    item.imageUrlFront = details.sprites.front_default;
    item.imageUrlBack = details.sprites.back_default;
    item.height = details.height;
    item.types = details.types;
    item.weight = details.weight;
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


