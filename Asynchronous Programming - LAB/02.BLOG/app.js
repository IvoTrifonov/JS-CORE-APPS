function attachEvents() {
    let allPosts = [];
    let postTitle = document.getElementById('post-title');
    let postComments = document.getElementById('post-comments');
    let postBody = document.getElementById('post-body');
    let posts = document.getElementById('posts');
    let loadPostsBtn = document.getElementById('btnLoadPosts');
    loadPostsBtn.addEventListener('click', loadPosts);

    let viewPostBtn = document.getElementById('btnViewPost');
    viewPostBtn.addEventListener('click', viewPost);

    function loadPosts() {
        posts.innerHTML = null;
        
        fetch('https://blog-apps-c12bf.firebaseio.com/posts.json')
        .then(response => response.json())
        .then((data) => {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    allPosts.push(element);
                    let option = document.createElement('option');
                    option.value = element.id;
                    option.textContent = element.title;
                    posts.appendChild(option);
                }
            }
        })
    }

    function viewPost() {
        postComments.innerHTML = null;
        let postId = posts.value;

        allPosts.forEach(post => {
            if (post.id === postId) {
                postTitle.textContent = post.title;
                postBody.textContent = post.body;

                fetch(`https://blog-apps-c12bf.firebaseio.com/comments.json`)
                .then(response => response.json())
                .then((data) => {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key];
                            if (element.postId === post.id) {
                                let li = document.createElement('li');
                                li.textContent = element.text;
                                postComments.appendChild(li);
                            }
                        }
                    }
                })
                
                return;
            }
        });
        
    }
}

attachEvents();