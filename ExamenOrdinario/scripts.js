document.addEventListener('DOMContentLoaded', () => {
    // Cargar álbumes cuando se finalice la carga del DOM
    loadAlbums();

    // Configurar evento de click para el botón de añadir álbum
    document.querySelector('.input-group button').addEventListener('click', addAlbum);

    // Configurar evento de click para el botón de buscar
    document.querySelectorAll('.input-group button')[1].addEventListener('click', filterAlbums);
});

const apiURL = 'https://jsonplaceholder.typicode.com/albums';

function loadAlbums() {
    // Cargar álbumes desde localStorage o hacer fetch si no hay ninguno guardado
    const savedAlbums = localStorage.getItem('albums');
    if (savedAlbums) {
        displayAlbums(JSON.parse(savedAlbums));
    } else {
        fetch(apiURL)
            .then(response => response.json())
            .then(albums => {
                localStorage.setItem('albums', JSON.stringify(albums));
                displayAlbums(albums);
            })
            .catch(error => console.error('Error fetching albums:', error));
    }
}

function displayAlbums(albums) {
    // Mostrar álbumes en la página
    const albumRow = document.getElementById('album');
    albumRow.innerHTML = ''; // Limpiar filas de álbumes existentes

    albums.forEach(album => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 mb-3';
        colDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <button class="btn btn-danger" onclick="deleteAlbum(${album.id})">Eliminar</button>
                </div>
            </div>
        `;
        albumRow.appendChild(colDiv);
    });
}

function addAlbum() {
    // Añadir un nuevo álbum
    const inputAlbum = document.getElementById('inputAlbum');
    const newAlbumTitle = inputAlbum.value.trim();
    if (newAlbumTitle) {
        const newAlbum = { title: newAlbumTitle, id: Date.now() }; // Crear un nuevo objeto de álbum
        const albums = JSON.parse(localStorage.getItem('albums')) || [];
        albums.unshift(newAlbum); // Añadir al inicio de la lista
        localStorage.setItem('albums', JSON.stringify(albums)); // Guardar en localStorage
        displayAlbums(albums); // Actualizar la visualización
        inputAlbum.value = ''; // Limpiar el campo de entrada
    }
}

function deleteAlbum(albumId) {
    // Eliminar un álbum existente
    let albums = JSON.parse(localStorage.getItem('albums'));
    albums = albums.filter(album => album.id !== albumId);
    localStorage.setItem('albums', JSON.stringify(albums));
    displayAlbums(albums);
}

function filterAlbums() {
    // Filtrar álbumes según la búsqueda
    const searchText = document.getElementById('inputBusqueda').value.toLowerCase().trim();
    const albums = JSON.parse(localStorage.getItem('albums')) || [];
    const filteredAlbums = albums.filter(album => album.title.toLowerCase().includes(searchText));
    displayAlbums(filteredAlbums);
}

// Hacemos que deleteAlbum y filterAlbums sean accesibles globalmente
window.deleteAlbum = deleteAlbum;
window.filterAlbums = filterAlbums;
