let api = "https://jsonplaceholder.typicode.com/users";

let getUsers = new Promise(function (resolve, reject) {

    let usersResponse = fetch(api);

    if (usersResponse) {
        //state fullfilled -> then
        resolve(usersResponse);
    } else {
        //state -> rejected -> catch ->
        reject("error : usersResponse are not found");
    }

});

getUsers.then((usersResponse) => {
    return usersResponse.json();
    //console.log(usersResponse);
}).then((users) => {
    console.log(users)
    users.forEach(user => {
        // Create tab button
        const tabButton = document.createElement("button");
        tabButton.textContent = user.username;
        tabButton.className = "tab-button";
        tabButton.addEventListener("click", () => showTab(user.id ,tabButton ));

        // Append tab button to container
        userTabsContainer.appendChild(tabButton);
    });

    // Show the first tab by default
    showTab(users[0].id);
    //return users ;
})
    .catch((err) => {
        console.log(err)
        return err;
    })

function showTab(userId,tabButton) {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  
  // Set the background color of the button
  tabButton.style.backgroundColor = randomColor;
    //tabButton.style.style.backgroundColor = "balck";
    // Hide all tabs
    //const tabs = document.querySelectorAll(".tab-content");
    //tabs.forEach(tab => tab.classList.remove("active"));

    // Show the selected tab
    /*const selectedTab = document.getElementById(`tab-${userId}`);
    if (selectedTab) {
        console.log(selectedTab) ;
        selectedTab.classList.add("active");
    }*/
    getPosts(userId);
}



// integeration backend

// //fetch -> get  -> return promise -> Response

function displayPosts(postsArr) {
    let content = document.getElementById("content") ;
    content.innerHTML = "" ;
    postsArr.forEach((element) => {
        console.log(content) ;
        content.innerHTML += `<h2>${element.body}</h2><p>${element.body}</p>`;
    });
}

async function getPosts(userId) {
    let api = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    let postsResponse = await fetch(api);
    //   console.log(postsResponse.json());
    let postsArr ;
    postsArr = await postsResponse.json(); //return promise -> array
    console.log(postsArr);
    displayPosts(postsArr);
}

getPosts(1);

const userTabsContainer = document.getElementById("userTabs");
