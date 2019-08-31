const movieController = function() {
    const getCreateMovie = function(context) {
        isLoggedIn(context);
        
        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/movies/create.hbs'); 
        })
    }

    const getMyMovies = async function(context) {
        isLoggedIn(context);
        try{
            let response = await movieModel.getMovies();
            context.movies = await response.json();
        } catch(e) {
            console.log(e);
        }
        
        context.movies = context.movies
            .filter(m => m.creator === JSON.parse(storage.getData('userInfo')).username);
        
        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/movies/myMovies.hbs'); 
        })
    }

    const getEditMovie = async function(context) {
        isLoggedIn(context);
        let response = await movieModel.getMovie(context.params.movieId);
        let movie = await response.json();
        
        Object.keys(movie).forEach((key) => {
            context[key] = movie[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/movies/edit.hbs'); 
        })
    }
    
    const postEditMovie = function(context) {
        movieModel.editMovie(context.params)
        .then(helper.handler)
        .then((data) => {
            getMyMovies(context);
        })
    }

    const postCreateMovie = function(context) {
        movieModel.createMovie(context.params)
        .then(helper.handler)
        .then((data) => {
            getMyMovies(context);
        })
    }

    const getDeleteMovie = async function(context) {
        isLoggedIn(context);
        let response = await movieModel.getMovie(context.params.movieId);
        let movie = await response.json();
        
        Object.keys(movie).forEach((key) => {
            context[key] = movie[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/movies/delete.hbs'); 
        })
    }

    const postDeleteMovie = function(context) {
        movieModel.deleteMovie(context.params.movieId)
        .then(helper.handler)
        .then((data) => {
            getMyMovies(context);
        })
    }

    const getDetails = async function(context) {
        isLoggedIn(context);
        let response = await movieModel.getMovie(context.params.movieId);
        let movie = await response.json();
        
        Object.keys(movie).forEach((key) => {
            context[key] = movie[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/movies/details.hbs'); 
        })
    }

    const getCinema = async function(context) {
        isLoggedIn(context);
        
        try{
            let response = await movieModel.getMovies();
            context.movies = await response.json();
        } catch(e) {
            console.log(e);
        }
        
        context.movies = context.movies.sort((a, b) => b.tickets - a.tickets);

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/movies/cinema.hbs'); 
        })
    }

    return {
        getCreateMovie,
        postCreateMovie,
        getMyMovies,
        getEditMovie,
        postEditMovie,
        getDeleteMovie,
        postDeleteMovie,
        getDetails,
        getCinema,
    }

    function isLoggedIn(context) {
        const loggedIn = storage.getData('userInfo') !== null;
        
        if(loggedIn){
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
            return true;
        }
    }
}();