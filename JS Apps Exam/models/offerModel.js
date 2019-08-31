const offerModel = function() {
   
    const createOffer = function(params) {
        let imageUrlPattern = /(https?:\/\/.*\.(?:jpg|jpeg|gif|png|svg))/;
        if(params.product && params.description && params.price &&
            imageUrlPattern.test(params.pictureUrl)) {
            
            let data = {
                ...params,
                creator: JSON.parse(storage.getData('userInfo')).username
            }
    
            let url = `/appdata/${storage.appKey}/offers`;
            let headers = {
                body: JSON.stringify(data),
                headers: {}
            }
    
            return requester.post(url, headers);
        } else {
            console.log('Invalid Input!')
        }
    }

    const getDashBoard = function() {
        let url = `/appdata/${storage.appKey}/offers`;
        let headers = {
            headers: {}
        }

        return requester.get(url, headers);
    }

    const getOffer = function(id) {
        let url = `/appdata/${storage.appKey}/offers/${id}`;
        let headers = {
            headers: {}
        }
    
        return requester.get(url, headers);
    }

    const editOffer = function(params) {
        let url = `/appdata/${storage.appKey}/offers/${params.id}`;
        params.creator = JSON.parse(storage.getData('userInfo')).username;
        let headers = {
            body: JSON.stringify(params),   
            headers: {}
        };

        return requester.put(url, headers);
    }

    const deleteOffer = function(id) {
        let url = `/appdata/${storage.appKey}/offers/${id}`;
        let headers = {
            headers: {}
        }

        return requester.del(url, headers);
    }

    return {
        createOffer,
        getDashBoard,
        getOffer,
        editOffer,
        deleteOffer
    }
}();