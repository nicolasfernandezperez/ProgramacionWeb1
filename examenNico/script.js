
        // Variable global para almacenar la lista de álbumes
        let albumList = [];

        // Función para cargar los álbumes
        function cargarAlbumes() {
            // URL de los álbumes
            const url = 'https://jsonplaceholder.typicode.com/albums';

            // Verificar si los álbumes ya están en la caché
            const albumesCache = localStorage.getItem('albumes');
            if (albumesCache) {
                // Si los álbumes están en caché, los usamos directamente
                albumList = JSON.parse(albumesCache);
            } else {
                // Si no están en caché, hacemos la petición fetch
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al obtener los álbumes');
                        }
                        return response.json();
                    })
                    .then(albumes => {
                        // Actualizamos la lista de álbumes
                        albumList = albumes;
                        // Guardamos los álbumes en la caché
                        localStorage.setItem('albumes', JSON.stringify(albumes));
                    })
                    .catch(error => {
                        console.error('Error al cargar los álbumes:', error);
                    });
            }
        }

        // Función para mostrar los álbumes (puedes personalizarla según tus necesidades)
        function mostrarAlbumes(lista = albumList) {
            // Utilizamos una lista por defecto igual a albumList si no se proporciona ninguna
            const contenedorAlbumes = document.getElementById('album');
            contenedorAlbumes.innerHTML = '';

            lista.forEach(album => {
                const divAlbum = document.createElement('div');
                divAlbum.classList.add('col-md-4', 'mb-3');
                divAlbum.innerHTML = `
                    <div class="card">
                        <div class="card-body position-relative">
                            <button class="btn-close position-absolute top-0 end-0" aria-label="Close" onclick="eliminarAlbum(${album.id})"></button>
                            <h5 class="card-title">Álbum: ${album.title}</h5>
                            <p class="card-text">UserID: ${album.userId}</p>
                            <p class="card-text">ID: ${album.id}</p>
                        </div>
                    </div>
                `;
                contenedorAlbumes.appendChild(divAlbum);
            });
        }

        // Llamamos a la función para cargar los álbumes al cargar la página
        cargarAlbumes();

        // Llamamos a la función para mostrar los álbumes, sin ningún criterio de búsqueda al principio
        mostrarAlbumes();

        function eliminarAlbum(albumId) {
            // Filtrar el álbum que se va a eliminar
            albumList = albumList.filter(album => album.id !== albumId);

            // Actualizar la lista de álbumes en localStorage
            localStorage.setItem('albumes', JSON.stringify(albumList));

            // Regenerar la visualización de álbumes
            mostrarAlbumes();
        }

        function anadirAlbum() {
            const inputAlbum = document.getElementById('inputAlbum');
            const tituloAlbum = inputAlbum.value.trim();

            // Verificar que el título no esté vacío
            if (tituloAlbum === '') {
                alert('Por favor, introduce un título para el álbum.');
                return;
            }

            // Obtener el ID del nuevo álbum
            const nuevoId = albumList.length > 0 ? Math.max(...albumList.map(album => album.id)) + 1 : 1;

            // Crear un nuevo álbum
            const nuevoAlbum = {
                userId: 1, // Puedes cambiar esto según sea necesario
                id: nuevoId,
                title: tituloAlbum
            };

            // Añadir el nuevo álbum a la lista y actualizar el localStorage
            albumList.push(nuevoAlbum);
            localStorage.setItem('albumes', JSON.stringify(albumList));
            alert("Álbum creado con éxito");

            // Limpiar el input y regenerar los álbumes
            inputAlbum.value = '';
            mostrarAlbumes();
        }

        document.querySelector('#inputBusqueda + button').addEventListener('click', function () {
            const inputBusqueda = document.getElementById('inputBusqueda');
            const criterio = inputBusqueda.value.trim();
            filtrarAlbumes(criterio);
        });

        function filtrarAlbumes(criterio) {
            const resultado = albumList.filter(album => {
                return (
                    album.title && album.title.toLowerCase().includes(criterio.toLowerCase()) ||
                    album.userId && album.userId.toString().includes(criterio) ||
                    album.id && album.id.toString().includes(criterio)
                );
            });
        
            mostrarAlbumes(resultado);
        }
        
        
        