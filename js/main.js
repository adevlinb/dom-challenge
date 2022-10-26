/*----- constants -----*/





/*----- app's state (variables) -----*/
let users;
let posts;
let selectedUser;




/*----- cached element references -----*/
let usersDiv = document.getElementById("users")
let postsDiv = document.getElementById("posts")
let postsHeaderEl = document.getElementById("selectedUser")




/*----- event listeners -----*/
usersDiv.addEventListener("click", handleUserClick);






/*----- functions -----*/

init();

async function init() {
    // get all users
    console.log("test")
    users = [];
    posts = [];
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => users = json);
    selectedUser = users[0]
    renderUsers();
    renderPosts();
}

function renderUsers() {
    console.log(users, posts)
    users.forEach(function(user, idx) {
        let title = document.createElement("h3");
        title.innerHTML = user.name
        title.id = idx
        usersDiv.appendChild(title)
    });
}

function renderPosts() {
    if (posts.length === 0) {
        postsHeaderEl.textContent = "Please Select A User On The Left"
    } else {
        console.log(selectedUser.name)
        postsHeaderEl.textContent = selectedUser.name
        posts.forEach(function(post, idx) {
            let title = document.createElement("h3");
            title.innerHTML = post.title
            postsDiv.appendChild(title)
        });
    }
}

function clearPreviousPosts() {
    while (postsDiv.firstChild) {
        postsDiv.removeChild(postsDiv.firstChild)
    }
}


async function handleUserClick(evt) {
    console.log(evt.target.id)
    if(evt.target.id === "users") return
    selectedUser = users[evt.target.id]
    posts = [];
    clearPreviousPosts();
    await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${users[evt.target.id].id}`)
        .then((response) => response.json())
        .then((json) => posts = json);
    renderPosts();
}