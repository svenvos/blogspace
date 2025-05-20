let postsArr = [];
const newPostForm = document.getElementById("new-post-form");

function renderPosts() {
    let tempString = "";
    postsArr.forEach(post => {
        tempString += `
            <div class="blog-post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `;
    });

    document.getElementById("blog-posts-container").innerHTML = tempString;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts", {method: "GET"})
    .then(response => response.json())
    .then(data => {
        postsArr = data.slice(0, 5);
        renderPosts();
    });

newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postTitle = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");

    const options = {
        method: "POST",
        body: JSON.stringify({
            title: postTitle.value,
            body: postBody.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(post => {
            postsArr.unshift(post);
            newPostForm.reset();
            renderPosts();
        });
});
