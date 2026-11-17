let numForm = document.getElementById("numButton");
numForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let num = await randNum(0, 100);
    console.log(num.randNum);
})


async function randNum(min, max) {

    let num = await fetch("/hello", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({max: max, min: min})
    });
    return await num.json();
}