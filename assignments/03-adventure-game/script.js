let rootDiv = document.body.appendChild(document.createElement("div"));
rootDiv.id = "root";

// function Room(name, description, linkedRooms, roomSpecificActions) {
//     this.name = name;
//     this.description = description;
//     this.linkedRooms = [];
//     this.roomSpecificActions = roomSpecificActions;
// }

let getInventory = function () {

    let inventoryDiv = document.createElement("div");
    inventoryDiv.classList.add("inventory")

    // create and append header
    let header = document.createElement("h3");
    header.innerHTML = "Inventory";
    inventoryDiv.appendChild(header);

    // iterate over inventory list and add as <p>
    for (let i = 0; i < currentInventory.length; i++) {
        let text = document.createElement("p");
        text.innerHTML = currentInventory[i].number + " " + currentInventory[i].name;
        inventoryDiv.appendChild(text);
    }

    return inventoryDiv;
}

let navButtonClicked = function () {
    return generate(roomArr[this.id]);
}

let generate = function (room) {
    // Clear out whatever room was previously visualized
    rootDiv.innerHTML = "";

    let roomDiv = document.createElement("div");

    // heading
    let roomTitle = document.createElement("h1");
    roomTitle.innerHTML = room.name;
    roomDiv.append(roomTitle);

    // inventory
    let inventoryDiv = getInventory(room);
    roomDiv.appendChild(inventoryDiv);

    // description text
    let descriptionP = document.createElement("p");
    descriptionP.innerHTML = room.description;
    roomDiv.append(descriptionP);

    // run room specific actions
    room.roomSpecificActions(roomDiv);

    // display choices/nav to next room
    for (let i = 0; i < room.linkedRooms.length; i++) {
        let navButton = document.createElement("button");
        navButton.innerHTML = room.linkedRooms[i].display;
        navButton.id = room.linkedRooms[i].roomName;
        navButton.addEventListener("click", navButtonClicked);
        // Note the missing parentheses: we hand the function itself to
        // addEventListener, we do not call it here.
        roomDiv.append(navButton);
    }

    rootDiv.appendChild(roomDiv);
}

// set up inventory
let currentInventory = {
    oxen: {number: 3, name: "Oxen"},
    party: {number: 4, name: "Party Members"},
    food: {number: 21, name: "Days of Food"},
    weapons: {number: 1, name: "Weapons"}
}

// initialize and describe rooms
let roomArr = {
    intro: {
        name: "Welcome to the Oregon Trail!",
        description: "Would you like to play?",
        linkedRooms: [{roomName: "fightScene", display: "Yes"}, {roomName: "dysentery", display: "No"}],
        roomSpecificActions: function (roomDiv) {
            return null;
        }
    },
    // all roads lead to r̶o̶m̶e̶ dysentery
    dysentery: {
        name: "dysentery",
        description: "You have died of dysentery.",
        linkedRooms: [],
        roomSpecificActions: function (roomDiv) {
            // set background
            document.body.style.background = "#000000";

            // add image
            let dysenteryImg = new Image();
            dysenteryImg.src = "./images/dysentery.jpg";
            dysenteryImg.classList.add("main-image");
            roomDiv.append(dysenteryImg);
        }
    },
    fightScene: {
        name: "Fight Scene",
        description: "Some highwaymen have come to rob your party of your supplies! What do you do?",
        linkedRooms: [{roomName: "dysentery", display: "Try to outtrun them"}, {
            roomName: "riverCrossing", display: "Stay and fight"
        }],
        roomSpecificActions: function (roomDiv) {
            return null;
        }
    },
    riverCrossing: {
        name: "River Crossing",
        description: "The water is high and fast. How will you navigate the obstacle?",
        linkedRooms: [{roomName: "dysentery", display: "idk"}, {
            roomName: "insufficientSupplies",
            display: "Wait for calmer waters"
        }],
        roomSpecificActions: function (roomDiv) {
            currentInventory["weapons"].number--;
        }
    },
    insufficientSupplies: {
        name: "Insufficient Supplies",
        description: "Winter is coming, but your party is low on food and water. What do you do?",
        linkedRooms: ["dysentery", "success"],
        roomSpecificActions: function (roomDiv) {
            return null
        }
    },
    success: {
        name: "Success",
        description: "Congratulations! You have reached the Willamette Valley.",
        linkedRooms: [],
        roomSpecificActions: function (roomDiv) {
            return null;
        }
    }
}

generate(roomArr["intro"]);


