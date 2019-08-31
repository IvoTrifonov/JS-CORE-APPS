const recipeController = function() {
    const getCreateRecipe = function(context) {
        isLoggedIn(context);

        context.loadPartials({
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"
        }).then(function () {
            this.partial('./views/recipes/create.hbs'); 
        })
    }

    const postCreateRecipe = function(context) {
        recipeModel.createRecipe(context.params)
        .then(helper.handler)
        .then((data) => {
            homeController.getHome(context);
        })
    }

    const getViewRecipe = async function(context) {
        isLoggedIn(context);

        let response = await recipeModel.getRecipe(context.params.id);
        let recipe = await response.json();
        
        Object.keys(recipe).forEach((key) => {
            context[key] = recipe[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/recipes/viewRecipe.hbs'); 
        })
    }


    return {
        getCreateRecipe,
        postCreateRecipe,
        getViewRecipe
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