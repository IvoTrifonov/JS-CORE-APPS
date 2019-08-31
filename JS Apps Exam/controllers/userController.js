const userController = function () {

    const getRegister = function (context) {

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/register.hbs')  // to be careful here
        })
    };

    const getLogin = function (context) {
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/login.hbs')  // to be careful here
        })
    };

    const postRegister = function (context) {
      
        userModel.register(context.params)
            .then(helper.handler)
            .then((data) => {
                storage.saveUser(data);
                homeController.getHome(context);  // to be careful here
            })
    };

    const postLogin = function (context) {

        userModel.login(context.params)
            .then(helper.handler)
            .then((data) => {
                storage.saveUser(data);
                homeController.getHome(context);  // to be careful here
            })
    };

    const logout = function (context) {

        userModel.logout()
            .then(helper.handler)
            .then(() => {
                storage.deleteUser();
                homeController.getHome(context);  // to be careful here
            });
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout
    }
}();