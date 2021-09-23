const d = document
const w = window


const query = new URLSearchParams(window.location.search)
const nombre = query.get('name')
const password = query.get('password')



console.log(nombre)

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


    //funcion traer usuario

    const traerUsuario = () => {

        const saludoUsuario = d.getElementById('bienvenidaUsuario')

        const user = JSON.parse(sessionStorage.getItem('user'))

        saludoUsuario.textContent = user.nombre
    }

    //funcion traer datos api peliculas

    const traerDatosApi = async() => {

        try {
            const res = await fetch('https://www.omdbapi.com/?s=star trek&apikey=d236c93c')
            const data = await res.json()
            const datos = data.Search
            peliculas(datos)
            pintarDatos(datos)
            buscadorPeliculas(datos)

        } catch (error) {
            console.log(error)
        }


    }

    //funcion para buscar peliculas

    const formulario = d.getElementById('formulario')
    const texto = d.getElementById('buscar')

    const buscadorPeliculas = (datos) => {


        formulario.addEventListener('keyup', (e) => {

            e.preventDefault()

            const textoUsuario = texto.value.toLowerCase()

            console.log(textoUsuario)

            const textoFiltrado = datos.filter(item => {

                console.log(item)

                const datossession = item.Title.toLowerCase()

                if (datossession.indexOf(textoUsuario) !== -1) {

                    return item

                }
            })

            pintarDatos(textoFiltrado)

        })
    }




    //funcion pintar datos 

    const coleccionPeliculas = d.getElementById('coleccionPeliculas')

    const pintarDatos = (datos) => {


        let items = ''

        // const peliculas = JSON.parse(sessionStorage.getItem('peliculas'))


        for (let item of datos) {


         
            items += `
            
            <article class="coleccion__peliculas__card" id="coleccionPeliculasCard">
                <img src="${item.Poster}" alt="">
                <h3>${item.Title}</h3>
                <p>Año:${item.Year}</p>
                <p class="id" id="id">${item.imdbID}</p>
                <button class="ir__favoritos  boton" id="irFavoritos" imdb=${item.imdbID}> Añadir a Favoritos...</button>
            </article>



            `

        };

        coleccionPeliculas.innerHTML = items


    }


    //conseguimos datos sessionStorage

    const datosSesion = (params) => {


        const peliculas = JSON.parse(sessionStorage.getItem('peliculas'))

        peliculas.forEach(element => {


            if (element.imdbID == params) {

                      
                if (typeof(Storage) !== "undefined") {

                    if (!localStorage.getItem('favoritos')) {


                        let favoritos = []
                        favoritos.push(element)

                        localStorage.setItem("favoritos", JSON.stringify(favoritos))

                        

                    } else {
                 

                            

                            let favoritos = JSON.parse(localStorage.getItem('favoritos'))
                            favoritos.push(element)
    
                            localStorage.setItem("favoritos", JSON.stringify(favoritos))
                      
                    }
            

                } else {

              
                    alert('Storage no soportado en este navegador')
                 }

                    


            }

        });

    }


    const coleccionPelis = d.getElementById('coleccionPeliculas')
    coleccionPelis.addEventListener('click', (e) => {

        let params = e.target.attributes[2].value     

        datosSesion(params)
        e.target.textContent = 'AÑADIDA'

        e.target.disabled = true;


    })

    //funcion crear el session storage

    const peliculas = (datos) => {


        let peliculas = datos

        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem("peliculas", JSON.stringify(peliculas))


        } else {
            alert('Storage no soportado en este navegador')
        }

    }


    const btnIrFavoritos = d.getElementById('btnFavoritos')

    btnIrFavoritos.addEventListener('click', (e) => {

        w.location = '/favoritos.html?name=joaquin&password=123'
    })


    const btnLogout = d.getElementById('btnLogout')

    btnLogout.addEventListener('click', (e) => {

        if (confirm("Se marcha de la aplicación, está convencido?")) {

            sessionStorage.removeItem('user')
            sessionStorage.removeItem('peliculas')
            w.location = '/index.html'

        } else {
            return false
        }
    })





    traerUsuario()
    traerDatosApi()

})