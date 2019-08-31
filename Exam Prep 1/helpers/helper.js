const helper = function () {

    const handler = function (response) {

        if (response.status >= 400) {
            stopNotify();
            notify('error', response.statusText)
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        if (response.status !== 204) {
            response = response.json();
        }

        return response;
    };

    const passwordCheck = function (params) {
        return params.password === params.rePassword;
    };

    const notify = function(type, textContent) {
        let element = '';

        switch (type) {
            case 'success':
                element = document.getElementById('successBox');
                element.textContent = textContent;
                element.addEventListener('click', (e) => e.currentTarget.style.display = 'none');
                break;
            case 'error':
                element = document.getElementById('errorBox');
                element.textContent = textContent;
                element.addEventListener('click', (e) => e.currentTarget.style.display = 'none');
                break;
            case 'loading':
                element = document.getElementById('loadingBox');
                element.textContent = 'Loading...';
                break;
        }

        element.style.display = 'block';
    }

    const stopNotify = function() {
        Array.from(document.getElementById('notifications').children).
        forEach((ch)=>{
            ch.style.display = 'none';
        })
    }

    return {
        handler,
        passwordCheck,
        notify,
        stopNotify
    }
}();