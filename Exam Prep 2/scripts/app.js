const app = Sammy("#main", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);
    
    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);
    
    // Movies
    this.get('#/createMovie', movieController.getCreateMovie);
    this.get('#/myMovies', movieController.getMyMovies);
    this.get('#/editMovie/:movieId', movieController.getEditMovie);
    this.get('#/deleteMovie/:movieId', movieController.getDeleteMovie);
    this.get('#/details/:movieId', movieController.getDetails);
    this.get('#/cinema', movieController.getCinema)
    this.get('#/buyTicket/:movieId', movieController.getTicket);

    this.post('#/createMovie', movieController.postCreateMovie);
    this.post('#/editMovie/:movieId', movieController.postEditEvent);
    this.post('#/deleteMovie/:movieId', movieController.postDeleteMovie);
    this.post('#/buyTicket/:movieId', movieController.buyTicket);
});

(() => {
    app.run('#/home');
})();