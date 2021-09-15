const d = document
const w = window

//funcion proteger entrada por URL

const query = new URLSearchParams(window.location.search)
const nombre = query.get('name')
const password = query.get('password')



if (nombre == 'joaquin' && password == '123') {
    const user = {
        nombre,
        password
    }


    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("user", JSON.stringify(user))
    } else {
        alert('Storage no soportado en este navegador')
    }



} else {

    alert('Usuario o Contraseña incorrectos')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('peliculas')
    w.location = '/index.html'



}

d.addEventListener('DOMContentLoaded', () => {

  


    //pintamos las peliculas favoritas

    const peliculasFavoritas = d.getElementById('peliculasFavoritas')

    const pintarFavoritos = () => {

        let items = ''

        const peliculas = JSON.parse(localStorage.getItem('favoritos'))

        for (let item of peliculas) {



            items += `
            
            <article class="coleccion__peliculas__card" id="coleccionPeliculasCard">
                <img src="${item.Poster}" alt="">
                <h3>${item.Title}</h3>
                <p>Año:${item.Year}</p>
                <button class="eliminar__peli  boton__red" id="eliminarPeli" imdb=${item.imdbID}>Eliminar Película</button>
             
            </article>



            `

        };

        peliculasFavoritas.innerHTML = items

    }

    //borrar peliculas favoritas

    const borrarPeliculas = (params) => {

        const peliculas = JSON.parse(localStorage.getItem('favoritos'))

        peliculas.forEach(element => {

            if (element.imdbID == params) {


                let restoPelis = peliculas.filter((i) => i !== element)

                localStorage.setItem("favoritos", JSON.stringify(restoPelis))

                pintarFavoritos()

            }

        });
    }

    const pelisFavoritas = () => {

        const peliculasFavoritas = d.getElementById('peliculasFavoritas')

        peliculasFavoritas.addEventListener('click', (e) => {

           const eliminarPelicula = confirm('Vas a eliminar una película. Realizar la acción?')

            if(eliminarPelicula == true){


                let params = e.target.attributes[2].value
                borrarPeliculas(params)
    
                document.getElementById('irFavoritos').disabled = false;
                document.getElementById('irFavoritos').textContent = 'Añadir a Favoritos...';
            }

            

        })
    }


    const irPeliculas = d.getElementById('btnIrPeliculas')

    irPeliculas.addEventListener('click', (e) => {

        w.location = '/peliculas.html?name=joaquin&password=123'

    })





    pintarFavoritos()

    pelisFavoritas()

})