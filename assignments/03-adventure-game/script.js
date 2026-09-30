let rootDiv = document.body.appendChild(document.createElement("div"));
rootDiv.id = "root";

// function Room(name, description, linkedRooms, roomSpecificActions) {
//     this.name = name;
//     this.description = description;
//     this.linkedRooms = [];
//     this.roomSpecificActions = roomSpecificActions;
// }

// set up inventory
let currentInventory = {
    oxen: {number: 3, name: "Oxen"},
    party: {number: 4, name: "Party Members"},
    food: {number: 28, name: "Days of Food"},
    weapons: {number: 1, name: "Weapons"}
}

let decrementInventory = function (key, value = 1) {
    if (currentInventory[key].number >= value) {
        currentInventory[key].number -= value;
    }
}

let incrementInventory = function (key, value = 1) {
    currentInventory[key].number += value;
}

let newInventory = function (key, name, number) {
    // just overwrite if value already exists
    currentInventory[key] = {number: number, name: name};
}

let generateInventory = function (rootDiv) {
    // if there is little food, insufficient supplies
    if (currentInventory["food"].number >= 1 && currentInventory["food"].number <= 7) {
        generate(roomArr["insufficientSupplies"]);
        return;
    }
    // if there is no food, die
    if (currentInventory["food"].number === 0) {
        generate(roomArr["dysentery"]);
        return;
    }
    // every time inventory is generated (an action scene happens), decrement food
    decrementInventory("food", 7);

    let inventoryDiv = document.createElement("div");
    inventoryDiv.classList.add("inventory")

    // create and append header
    let header = document.createElement("h3");
    header.innerHTML = "Inventory";
    inventoryDiv.appendChild(header);

    // iterate over inventory list and add as <p>
    for (let key in currentInventory) {
        let item = currentInventory[key];
        console.log(item.name);
        let text = document.createElement("p");
        text.innerHTML = item.number + " " + item.name;
        inventoryDiv.appendChild(text);
    }

    rootDiv.appendChild(inventoryDiv);
}

let navButtonClicked = function () {
    return generate(roomArr[this.id]);
}

let generate = function (room) {
    // Clear out whatever room was previously visualized
    rootDiv.innerHTML = "";

    let roomDiv = document.createElement("div");
    roomDiv.classList.add("roomDiv");
    roomDiv.id = room.name + "Div";

    // heading
    let roomTitle = document.createElement("h1");
    roomTitle.innerHTML = room.name;
    roomDiv.append(roomTitle);

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
        navButton.classList.add("nav-button");
        navButton.addEventListener("click", navButtonClicked);
        // Note the missing parentheses: we hand the function itself to
        // addEventListener, we do not call it here.
        roomDiv.append(navButton);
    }

    rootDiv.appendChild(roomDiv);
}

// initialize and describe rooms
let roomArr = {
    intro: {
        name: "Welcome to the Oregon Trail!",
        description: "Would you like to play?",
        linkedRooms: [{roomName: "fightScene", display: "Yes"}, {roomName: "dysentery", display: "No"}],
        roomSpecificActions: function (roomDiv) {
            document.body.style.background = "#000000";
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
            document.body.style.background = "#000000";
            generateInventory(roomDiv);
        }
    },
    riverCrossing: {
        name: "River Crossing",
        description: "The water is high and fast. How will you navigate the obstacle?",
        linkedRooms: [{roomName: "treacherousMountain", display: "Push through"}, {
            roomName: "insufficientSupplies", display: "Wait for calmer waters"
        }],
        roomSpecificActions: function (roomDiv) {
            document.body.style.background = "#000000";
            decrementInventory("weapons");
            generateInventory(roomDiv);
        }
    },
    treacherousMountain: {
        name: "Treacherous Mountain",
        description: "Two of your children and one of your oxen died in the river. The lighter load allowed you to take" +
            "the more direct South Pass, but the route is more treacherous than you thought. What do you do?",
        linkedRooms: [{roomName: "dysentery", display: "Stay the course"}, {
            roomName: "insufficientSupplies",
            display: "Turn around and take a safer path"
        }],
        roomSpecificActions: function (roomDiv) {
            document.body.style.background = "#000000";
            incrementInventory("food", 3); // more days of food bc less people
            decrementInventory("party", 2);
            decrementInventory("oxen", 1);
            generateInventory(roomDiv);
        }
    },
    insufficientSupplies: {
        name: "Insufficient Supplies",
        description: "Winter is coming, but your party is low on food and water. What do you do?",
        linkedRooms: [{roomName: "success", display: "Stop and buy more supplies"}, {
            roomName: "dysentery", display: "Travel faster"
        }],
        roomSpecificActions: function (roomDiv) {
            document.body.style.background = "#000000";
            decrementInventory("oxen");
            generateInventory(roomDiv);
        }
    },
    success: {
        name: "Success",
        description: "Congratulations! You have reached the Willamette Valley.",
        linkedRooms: [],
        roomSpecificActions: function (roomDiv) {
            document.body.style.background = "#000000";
        }
    }
}

generate(roomArr["intro"]);


