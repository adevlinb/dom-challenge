/*----- constants -----*/





/*----- app's state (variables) -----*/
let users;
let posts;





/*----- cached element references -----*/
let usersDiv = document.getElementById("users")






/*----- event listeners -----*/
usersDiv.addEventListener("click", handleUserClick);






/*----- functions -----*/

init();

async function init() {
    // get all users
    users = [];
    posts = [];
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => users = json);


    render();
}

function render() {
    console.log(users)
    users.forEach(function(user, idx) {
        let title = document.createElement("h1");
        title.innerHTML = user.name
        title.id = idx
        usersDiv.appendChild(title)
    });
    // posts.forEach(function(user, idx) {
    //     let title = document.createElement("h1");
    //     title.innerHTML = user.name
    //     title.id = idx
    //     usersDiv.appendChild(title)
    // });

}

async function handleUserClick(evt) {
    console.log(evt, users[evt.target.id].id, evt.target.id);

    // await fetch(`https://jsonplaceholder.typicode.com/posts/${users[evt.target.id].id}`)
    await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${users[evt.target.id].id}`)
        .then((response) => response.json())
        .then((json) => console.log(json, "posts"));

}