const eventController = function() {
    const getCreateEvent = function(context) {
        isLoggedIn(context);

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function () {
            this.partial('./views/events/createEvent.hbs'); 
        })
    }
    
    const postCreateEvent = function(context) {
        eventModel.createEvent(context.params)
        .then(helper.handler)
        .then((data) => {
            homeController.getHome(context)
        })
    }

    const getDetailsEvent = async function(context) {
        isLoggedIn(context);
        
        let response = await eventModel.getEvent(context.params.eventId);
        let event = await response.json();
        
        Object.keys(event).forEach((key) => {
            context[key] = event[key];
        })

        context.isCreator = JSON.parse(storage.getData('userInfo')).username === event.organizer;
        
        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function() {
            this.partial('./views/events/detailsEvent.hbs');
        })
    }

    const getEditEvent = async function(context) {
        isLoggedIn(context);
        let response = await eventModel.getEvent(context.params.eventId);
        let event = await response.json();
        
        Object.keys(event).forEach((key) => {
            context[key] = event[key];
        })

        context.loadPartials({
            header: './views/common/header.hbs', 
            footer: './views/common/footer.hbs' 
        }).then(function() {
            this.partial('./views/events/editEvent.hbs')
        })
    }   

    const postEditEvent = function(context) {
        eventModel.editEvent(context.params)
        .then(helper.handler)
        .then((data) => {
            homeController.getHome(context);
        })
    }

    const postDeleteEvent = function(context) {
        eventModel.deleteEvent(context.params.eventId)
        .then(helper.handler)
        .then((data) => {
            homeController.getHome(context);
        })
    }

    return {
        getCreateEvent,
        postCreateEvent,
        getDetailsEvent,
        getEditEvent,
        postEditEvent,
        postDeleteEvent,
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