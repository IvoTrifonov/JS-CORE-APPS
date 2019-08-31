function loadCommits() {
    let commits = document.getElementById('commits');
    let userName = document.getElementById('username');
    let repo = document.getElementById('repo');
    let url = `https://api.github.com/repos/${userName.value}/${repo.value}/commits`;
    commits.innerHTML = null;
    
    fetch(url)
    .then(response => {
        if (response.status >= 400) {
            let li = document.createElement('li');
            li.textContent = `"Error: ${response.status} (${response.statusText})"`;
            commits.appendChild(li);

            throw new Error(response);
        }
        
        return response.json();
    })
    .then((data) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                let li = document.createElement('li');
                li.textContent = `${element.commit.author.name}: ${element.commit.message}`;

                commits.appendChild(li);
            }
        }
    })
    .catch(err => err)
}