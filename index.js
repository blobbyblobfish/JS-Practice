document.addEventListener("DOMContentLoaded", () => {
    const filterDropdown = document.querySelector("select")

    //Render movies
    const horror = document.getElementById("horror")
    const horrorMovies = []
    const comedy = document.getElementById("comedy")
    const comedyMovies = []
    const action = document.getElementById("action")
    const actionMovies = []

    function fetchHorror() {
        fetch("http://localhost:4000/horror")
        .then(resp => resp.json())
        .then(json => renderHorrorMovies(json))
    }

    function fetchComedy() {
        fetch("http://localhost:4000/comedy")
        .then(resp => resp.json())
        .then(json => renderComedyMovies(json))
    }

    function fetchAction() {
        fetch("http://localhost:4000/action")
        .then(resp => resp.json())
        .then(json => renderActionMovies(json))
    }

    function renderHorrorMovies(movies){
        movies.forEach(movie => renderHorrorMovie(movie))
    }

    function renderComedyMovies(movies){
        movies.forEach(movie => renderComedyMovie(movie))
    }

    function renderActionMovies(movies){
        movies.forEach(movie => renderActionMovie(movie))
    }

    function renderHorrorMovie(movie){
        horrorMovies.push(movie)

        const id = movie.id || null
        const cover = `${movie.cover}`
        
        movie["duration-in-hours"] = movie["duration-in-hours"] || movie.duration

        const movieLi = document.createElement("li")
        movieLi.className = "movie-card"
        movieLi.innerHTML = `
        <h1>${movie.title}</h1>
        <h4>Duration: ${movie["duration-in-hours"]} hours</h4> 
        <img src=${cover} data-id=${id}>
        <hr>
        <button data-category="horror" data-status="closed" data-id=${id}>View Cast</button>
        <button data-category="horror" data-id=${id}>Delete Movie</button>
        <hr>
        `
        horror.append(movieLi)
    }

    function renderComedyMovie(movie){
        comedyMovies.push(movie)

        const id = movie.id || null
        const cover = `${movie.cover}`
        
        movie["duration-in-hours"] = movie["duration-in-hours"] || movie.duration

        const movieLi = document.createElement("li")
        movieLi.className = "movie-card"
        movieLi.innerHTML = `
        <h1>${movie.title}</h1>
        <h4>Duration: ${movie["duration-in-hours"]} hours</h4>
        <img src=${cover} data-id=${id}>
        <hr>
        <button data-category="comedy" data-status="closed" data-id=${id}>View Cast</button>
        <button data-category="comedy" data-id=${id}>Delete Movie</button>
        <hr>
        `
        comedy.append(movieLi)
    }

    function renderActionMovie(movie){
        actionMovies.push(movie)

        const id = movie.id || null
        const cover = `${movie.cover}`
        
        movie["duration-in-hours"] = movie["duration-in-hours"] || movie.duration

        const movieLi = document.createElement("li")
        movieLi.className = "movie-card"
        movieLi.innerHTML = `
        <h1>${movie.title}</h1>
        <h4>Duration: ${movie["duration-in-hours"]} hours</h4>
        <img src=${cover} data-id=${id}>
        <hr>
        <button data-category="action" data-status="closed" data-id=${id}>View Cast</button>
        <button data-category="action" data-id=${id}>Delete Movie</button>
        <hr>
        `
        action.append(movieLi)
    }

    fetchHorror()
    fetchComedy()
    fetchAction()

    //Dropdown menu
    function removeHorrorMovies(){
        horror.innerHTML = `<h2>Horror Movies:</h2>`
    }

    function removeComedyMovies(){
        comedy.innerHTML = `<h2>Comedy Movies:</h2>`
    }

    function removeActionMovies(){
        action.innerHTML = `<h2>Action Movies:</h2>`
    }

    document.addEventListener("change", (e) => {
        if (e.target === filterDropdown && e.target.value === "horror") {
            removeHorrorMovies()
            removeComedyMovies()
            removeActionMovies()
            fetchHorror()
        }
        else if (e.target === filterDropdown && e.target.value === "comedy") {
            removeHorrorMovies()
            removeComedyMovies()
            removeActionMovies()
            fetchComedy()
        }
        else if (e.target === filterDropdown && e.target.value === "action") {
            removeHorrorMovies()
            removeComedyMovies()
            removeActionMovies()
            fetchAction()
        }
        else if (e.target === filterDropdown && e.target.value === "all") {
            removeHorrorMovies()
            removeComedyMovies()
            removeActionMovies()
            fetchHorror()
            fetchComedy()
            fetchAction()
        }
    })

    //Add movie (optimistically)
    const toolsDiv = document.querySelector(".tools")
    const addMovieButton = document.querySelector("body > div > div > button")
    addMovieButton.dataset.status = "closed"

    function createMovieForm(){
        const addMovieForm = document.createElement("form")
            addMovieForm.dataset.class = "add-form"
            addMovieForm.innerHTML = `
            <hr>
            <label>Title</label><br>
            <input type="text" name="title" placeholder="e.g. 'Stardust'"></input><br>
            <label>Duration (in hours)</label><br>
            <input type="text" name="duration" placeholder="2.2 hours"></input><br>
            <label>Cover</label><br>
            <input type="text" name="cover" placeholder="http://..."></input><br>
            <label>Cast</label><br>
            <input type="text" name="cast" placeholder="Name"></input><br>
            <input type="text" name="character" placeholder="Character"></input><br>
            <br><label>Category</label><br>
            <select name="category">
                <option value="horror">Horror</option>
                <option value="comedy">Comedy</option>
                <option value="action">Action</option>
            </select><br>
            <br><input type="submit">
            <hr>
            `
        toolsDiv.append(addMovieForm)
    }

    document.addEventListener("click", (e) => {
        if (e.target.textContent === "Add Movie" && e.target.dataset.status === "closed") {
            e.target.dataset.status = "opened"
            createMovieForm()
        }
        else if (e.target.textContent === "Add Movie" && e.target.dataset.status === "opened") {
            e.target.dataset.status = "closed"
            toolsDiv.removeChild(toolsDiv.lastChild)
        }
        
        //View cast
        else if (e.target.textContent === "View Cast" && e.target.dataset.status === "closed") {

            if (e.target.dataset.category === "horror") {
                const castUl = document.createElement("ul")
                castUl.dataset.class = "cast-ul"
                castUl.innerHTML = renderCast(horrorMovies[e.target.dataset.id - 1])
                e.target.parentNode.append(castUl)
            }

            else if (e.target.dataset.category === "comedy") {
                const castUl = document.createElement("ul")
                castUl.dataset.class = "cast-ul"
                castUl.innerHTML = renderCast(comedyMovies[e.target.dataset.id - 1])
                e.target.parentNode.append(castUl)
            }

            else if (e.target.dataset.category === "action") {
                const castUl = document.createElement("ul")
                castUl.dataset.class = "cast-ul"
                castUl.innerHTML = renderCast(actionMovies[e.target.dataset.id - 1])
                e.target.parentNode.append(castUl)
            }   
        }

        //Delete movie (optimistically)
        else if (e.target.textContent === "Delete Movie") {
            e.target.parentNode.remove()

            fetch(`http://localhost:4000/${e.target.dataset.category}/${e.target.dataset.id}`, {
                method: "DELETE"
            })
        }

        //Show movie
        else if (e.target.src) {
            console.log("poster!")
        }

        //Go back to index page

        //Add cast member

        //Add additional cast
        
    })

    //Add movie (optimistically)
    document.addEventListener("submit", (e) => {
        e.preventDefault()

        const movieForm = document.querySelector("body > div > div > form")

        if (e.target === movieForm) {
            const title = e.target.title.value
            const duration = e.target.duration.value
            const cover = e.target.cover.value
            const cast = e.target.cast.value
            const category = e.target.category.value

            const movie = {title: title, duration: duration, cover: cover, cast: cast}
            
            if (category === "horror") {
                renderHorrorMovie(movie)
                
                fetch("http://localhost:4000/horror", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(movie)
                })
                .then(resp => resp.json())
                .then(console.log)
            }
            else if (category === "comedy") {
                renderComedyMovie(movie)
                
                fetch("http://localhost:4000/comedy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(movie)
                })
                .then(resp => resp.json())
                .then(console.log)
            }
            else if (category === "action") {
                renderActionMovie(movie)
                
                fetch("http://localhost:4000/action", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(movie)
                })
                .then(resp => resp.json())
                .then(console.log)
            }

        }
    })

    //View cast
    function fetchAndRenderCast(category, movieId) {
        fetch(`http://localhost:4000/${category}/${movieId}`)
        .then(resp => resp.json())
        .then(json => renderCast(json))
    }

    function renderCast(movie) {
        const innerHTML = []
        for (actor in movie.cast) {
            innerHTML.push(`<li>${movie.cast[actor].name} as ${movie.cast[actor].character}</li>`)
        }
        
        return innerHTML.join(" ")
    }


})