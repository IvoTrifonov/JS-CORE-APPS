const recipeModel = function() {
    const createRecipe = function(params){
        params.ingredients = params.ingredients.split(', ');
        let data = {
            ...params,
            creator: JSON.parse(storage.getData('userInfo')).username,
            likesCounter: 0,
            // categoryImageURL
        }

        let url = `/appdata/${storage.appKey}/recipes`;
        let headers = {
            body: JSON.stringify(data),
            headers: {}
        }

        return requester.post(url, headers);
    }
    
    const getAllRecipes = function() {
        let url = `/appdata/${storage.appKey}/recipes`;
        let headers = {
            headers: {}
        }

        return requester.get(url, headers);
    }

    const getRecipe = function(id) {
        let url = `/appdata/${storage.appKey}/recipes/${id}`;
        let headers = {
            headers: {}
        }
        
        return requester.get(url, headers);
    }

    return {
        createRecipe,
        getAllRecipes,
        getRecipe
    }
}();