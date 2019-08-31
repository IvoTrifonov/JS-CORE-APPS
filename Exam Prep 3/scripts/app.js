const app = Sammy("#rooter", function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);
    
    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);
    
    // recipes
    this.get('#/create', recipeController.getCreateRecipe);
    this.get('#/viewRecipe/:id', recipeController.getViewRecipe);


    this.post('#/create', recipeController.postCreateRecipe);

});

(() => {
    app.run('#/home');
})();