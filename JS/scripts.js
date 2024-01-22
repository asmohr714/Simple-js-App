


// IIFE Pokemon Repository API and Functions

let pokemonRepository = (function () {
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    button.addEventListener('click', function(Event) {
      showDetails(pokemon);    
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

function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        console.log(pokemon);
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

  // Show Modal Function

function showModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.add('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal();
});

function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');

  // Close On 'Click' Outside Modal

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  // Clear All Existing Modal Content

  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Close Button 

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  // Text and Title

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);



  modalContainer.classList.add('is-visible');
}

// Modal Event Listener

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

// Dialog Event Listener

document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?');
});

// Dialog Event Confirmation

document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
    alert('confirmed!');
  }, () => {
    alert('not confirmed');
  });
});

function showDialog(title, text) {
  // [...] Your existing code

  // Return a promise that resolves when confirmed, else rejects
  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', () => {
      hideModal();
      reject();
    });
    confirmButton.addEventListener('click', () => {
      hideModal();
      resolve();
    })
  });
}

// Close Modal Function

let dialogPromiseReject; // Set this later in showDialog 

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

// Keyboard Close Modal

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
    }
  });

// Show Dialog Function

function showDialog(title, text) {
  showModal(title, text);

  let modalContainer = document.querySelector('#modal-container');

  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  confirmButton.focus();
  
  // Dialog Confirmation Promise

  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null; // Reset this
      hideModal();
      resolve();
    });
  
    // This can be used to reject from other functions

    dialogPromiseReject = reject;
  });
}

// Add Image to Main

var img = document.createElement("img"); 
 
img.src = "/IMG/pokequestion.png"; 
var src = document.getElementById("pokemon-pictures"); 
  
src.appendChild(img);




