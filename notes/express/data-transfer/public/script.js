let formElement = document.querySelector('#formElement');

formElement.addEventListener('submit', async e => {
    e.preventDefault();
    console.log("Form submitted!");

    // let res1 = await fetch("http://localhost:3000/food?food=burrito&user=quinn");
    // let json1 = await res1.json();
    // console.log(json1.message);

    let foodData = document.getElementById("foodInput").value;
    let userData = document.getElementById("userInput").value;

    let fData = {
        food: foodData,
        user: userData
    }
    let res2 = await fetch("/food", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(fData)
    })
    let json2 = await res2.json();
    console.log(json2.message);
});