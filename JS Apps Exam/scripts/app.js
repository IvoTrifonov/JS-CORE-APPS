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
    
    
    this.get('#/create', offerController.getCreateOffer);
    this.get('#/dashboard', offerController.loadDashboard);
    this.get('#/edit/:id', offerController.getEditOffer);
    this.get('#/delete/:id', offerController.getDeleteOffer);
    this.get('#/details/:id', offerController.getOfferDetails);
    // this.get('#/cinema', movieController.getCinema)
    // this.get('#/buyTicket/:movieId', movieController.getTicket);

    this.post('#/create', offerController.postCreateOffer);
    this.post('#/edit/:id', offerController.postEditOffer);
    this.post('#/delete/:id', offerController.postDeleteOffer);
    // this.post('#/buyTicket/:movieId', movieController.buyTicket);
});

(() => {
    app.run('#/home');
})();