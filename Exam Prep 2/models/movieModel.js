const movieModel = function() {
    const createMovie = function(params) {
        let data = {
            ...params,
            creator: JSON.parse(storage.getData('userInfo')).username
        }

        let url = `/appdata/${storage.appKey}/movies`;
        let headers = {
            body: JSON.stringify(data),
            headers: {}
        }

        return requester.post(url, headers);
    }

    const getMovie = function(id) {
        let url = `/appdata/${storage.appKey}/movies/${id}`;
        let headers = {
            headers: {}
        }
        
        return requester.get(url, headers);
    }

    const getMovies = function() {
        let url = `/appdata/${storage.appKey}/movies`;
        let headers = {
            headers: {}
        }

        return requester.get(url, headers);
    }

    const editMovie = function(params) {
        let url = `/appdata/${storage.appKey}/movies/${params.movieId}`;
        params.creator = JSON.parse(storage.getData('userInfo')).username;
        let headers = {
            body: JSON.stringify(params),   
            headers: {}
        };

        return requester.put(url, headers);
    }

    const deleteMovie = function(id) {
        let url = `/appdata/${storage.appKey}/movies/${id}`;
        let headers = {
            headers: {}
        }

        return requester.del(url, headers);
    }

    return {
        createMovie,
        getMovie,
        getMovies,
        editMovie,
        deleteMovie
    }
}();            