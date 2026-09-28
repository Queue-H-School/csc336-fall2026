let room_arr = [];
let rootDiv = document.body.appendChild(document.createElement("div"));
rootDiv.id = "root";

let setUpRoom = function (rTitle, rClass) {
    let roomDiv = document.createElement("div");
    roomDiv.classList.add(rClass);

    // create and add title
    let roomTitle = document.createElement("title");
    roomTitle.innerHTML = rTitle;
    roomDiv.appendChild(roomTitle);

    return roomDiv;
}

let inventoryDisplay = function (inventory) {
    let inventoryDiv = document.createElement("div");
    inventoryDiv.classList.add("inventory")

    // create and append header
    let header = document.createElement("h3");
    header.innerHTML = "Inventory";
    inventoryDiv.appendChild(header);

    // iterate over inventory list and add as <p>
    for (let i = 0; i < inventory.length; i++) {
        let text = document.createElement("p");
        text.innerHTML = inventory[i].number + " " + inventory[i].name;
        inventoryDiv.appendChild(text);
    }

    return inventoryDiv;
}

let optionDisplay = function (options) {
    let optionDiv = document.createElement("div");
    optionDiv.classList.add("option");

    // create and append header
    let header = document.createElement("h3");
    header.innerHTML = "Would you like to:";
    optionDiv.appendChild(header);

    // iterate over option list and add as <p>
    for (let i = 0; i < options.length; i++) {
        let text = document.createElement("p");
        text.innerHTML = options[i].number + ": " + options[i].text;
        optionDiv.appendChild(text);
    }

    return optionDiv;
}

let addInputBox = function (parentDiv) {
    let inputDiv = document.createElement("div");
    inputDiv.classList.add("inputDiv");

    // create label
    let label = document.createElement("p");
    label.innerHTML = "Type your response here:";
    inputDiv.appendChild(label);

    // create input
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.id = "inputBox"
    inputDiv.appendChild(input);

    parentDiv.appendChild(inputDiv);
}

let clearRoom = function (room) {
    rootDiv.removeChild(room.roomDiv);
}

function Room(name, description, tag, exits) {
    this.name = name;
    this.description = description;
    this.roomDiv = setUpRoom(name, tag);
    this.tag = tag;
    this.exits = exits;
}

// all roads lead to r̶o̶m̶e̶ dysentery
let dysentery = new Room("Dysentery", "You have died of dysentery.", "dysentery", []);

// create dysentery room
dysentery.generate = function () {
    // set background
    document.body.style.background = "#000000";

    // add image
    let dysenteryImg = new Image();
    dysenteryImg.src = "./images/dysentery.jpg";
    dysenteryImg.classList.add("main-image");
    this.roomDiv.appendChild(dysenteryImg);

    rootDiv.appendChild(this.roomDiv);
};

// beginning room
let intro = new Room("Intro", "Welcome to the Oregon Trail!", "intro", [])

// create intro "room"
intro.generate = function () {
    rootDiv = document.querySelector("#root");
    let roomDiv = setUpRoom("Intro", "intro");

    // inventory
    let inventoryList = [{number: 3, name: "Oxen"},
        {number: 4, name: "Party Members"},
        {number: 7, name: "Days of Food"},
        {number: 1, name: "Weapons"}];
    let inventoryDiv = inventoryDisplay(inventoryList);
    roomDiv.appendChild(inventoryDiv);

    // options
    let beginTrail = function () {
        clearRoom(this)
        dysentery.generate();
    }
    let optionsList = [{number: 1, text: "Begin the trail!", action: beginTrail}];

    let optionDiv = optionDisplay(optionsList);
    roomDiv.appendChild(optionDiv);

    // add input box
    addInputBox(roomDiv);

    // test input
    let inputBox = document.querySelector("#inputBox");
    while (inputBox != null && inputBox.value != null) {
        console.log(inputBox.value);
        // iterate over options list
        for (let i = 0; i < optionsList.length; i++) {
            if (optionsList[i].number === inputBox.value) {
                optionsList[i].action();
            }
        }
    }

    rootDiv.appendChild(roomDiv);
};
intro.generate();


