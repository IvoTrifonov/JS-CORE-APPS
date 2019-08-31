const offerController = function() {
    
    const getCreateOffer = function(context) {
        isLoggedIn(context);

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/offers/create.hbs'); 
        })
    }

    const postCreateOffer = function(context) {
        offerModel.createOffer(context.params)
        .then(helper.handler)
        .then((data) => {
            loadDashboard(context);
        })
    }

    const loadDashboard = async function(context) {
        isLoggedIn(context);
        try{
            let response = await offerModel.getDashBoard();
            context.offers = await response.json();

            for (const key in context.offers) {
                context.offers[key].isCreator = JSON.parse(storage.getData('userInfo')).username === context.offers[key].creator;
            }

        } catch(e) {
            console.log(e);
        }
        
        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/offers/dashboard.hbs'); 
        })
    }

    const getEditOffer = async function(context) {
        isLoggedIn(context);

        let response = await offerModel.getOffer(context.params.id);
        let offer = await response.json();

        Object.keys(offer).forEach((key) => {
            context[key] = offer[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function() {
            this.partial('./views/offers/edit.hbs')
        })
    }

    const postEditOffer = function(context) {
        offerModel.editOffer(context.params)
        .then(helper.handler)
        .then((data) => {
            loadDashboard(context);
        })
    }

    const getDeleteOffer = async function(context) {
        isLoggedIn(context);
        let response = await offerModel.getOffer(context.params.id);
        let offer = await response.json();
        
        Object.keys(offer).forEach((key) => {
            context[key] = offer[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/offers/delete.hbs'); 
        })
    }

    const postDeleteOffer = function(context) {
        offerModel.deleteOffer(context.params.id)
        .then(helper.handler)
        .then((data) => {
            loadDashboard(context);
        })
    }
    
    const getOfferDetails = async function(context) {
        isLoggedIn(context);
        let response = await offerModel.getOffer(context.params.id);
        let offer = await response.json();
        
        Object.keys(offer).forEach((key) => {
            context[key] = offer[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/offers/details.hbs'); 
        })
    }

    return {
        getCreateOffer,
        postCreateOffer,
        loadDashboard,
        getEditOffer,
        postEditOffer,
        getDeleteOffer,
        postDeleteOffer,
        getOfferDetails
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