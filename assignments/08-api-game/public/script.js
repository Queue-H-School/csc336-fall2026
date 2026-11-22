let mainDiv = document.getElementById("mainDiv");

// on form submit, move to category selection and create new user
let nameForm = document.getElementById("nameForm");
nameForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get categories
    let catRes = await fetch("/categories");
    let categories = await catRes.json();

    // create category tiles
    createCategories(categories.trivia_categories);

    // create new user
    let name = document.getElementById("nameInput").value.trim();
    let scoreRes = await fetch("/scoreboard", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({name: name})
    })
    console.log(await scoreRes.json());
})

function createCategories(categories) {
    for (let x = 0; x < categories.length; x++) {

        // create div and label
        let tileDiv = mainDiv.appendChild(document.createElement("div"));
        tileDiv.classList.add("tileDiv");
        let tileName = tileDiv.appendChild(document.createElement("p"));
        tileName.classList.add("tileName");
        tileName.innerHTML = categories[x].name;

        // on click, start questions
        tileDiv.addEventListener("click", () => {

        })
    }
}


