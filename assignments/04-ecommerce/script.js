let rootDiv = document.body.appendChild(document.createElement("div"));
rootDiv.id = "root";

// requirements
// sort, map

// add to cart
let totalPrice = 0;
let itemTotal = 0;

let addPrice = function (product) {
    totalPrice += product.price;
    itemTotal++;
}

let isChecked = function (product) {
    return product.checkbox.checked;
}

// render
let render = function (product) {
    // if dropbox is empty, filter out unspecified categoru
    // else, filter to dropbox selection

    let productDiv = document.createElement("div");
    productDiv.classList.add("productDiv");
    productDiv.id = product.tag + "Div";

    // title and checkbox
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("productTitleDiv");

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    titleDiv.appendChild(checkbox);
    product.checkbox = checkbox;

    let title = document.createElement("h3");
    title.classList.add("productTitle");
    title.innerHTML = product.name;
    titleDiv.appendChild(title);

    // description
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("productDescriptionDiv");
    descriptionDiv.appendChild(titleDiv);

    let subtitle = document.createElement("p");
    subtitle.classList.add("productSubtitle");
    subtitle.innerHTML = product.description;
    descriptionDiv.appendChild(subtitle);

    productDiv.appendChild(descriptionDiv);

    // image
    let imageDiv = document.createElement("div");
    imageDiv.classList.add("productImageDiv");
    let image = document.createElement("img");
    image.src = product.image;
    imageDiv.appendChild(image);
    productDiv.appendChild(imageDiv);

    // category
    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("productCategoryDiv");

    let price = document.createElement("p");
    price.classList.add("productPrice");
    if (typeof (product.price) === "number") {
        price.innerHTML = `<b>$${product.price.toFixed(2)}</b>`;
    } else {
        price.innerHTML = product.price;
    }
    categoryDiv.appendChild(price);

    /* let category = document.createElement("p");
    category.classList.add("productCategory");
    category.innerHTML = "Type: " + product.category;
    categoryDiv.appendChild(category); */

    productDiv.appendChild(categoryDiv);

    let addtoCart = document.createElement("button");
    addtoCart.classList.add("addToCart");
    addtoCart.innerHTML = "Add to Cart";
    addtoCart.addEventListener("click", function () {
        addPrice(product);
    });
    productDiv.appendChild(addtoCart);

    rootDiv.appendChild(productDiv);
}


// title
let title = document.createElement("h1");
title.innerText = "The Dam Snack Bar";
title.id = "title";
rootDiv.appendChild(title);

// subtitle
let subtitle = document.createElement("h2");
subtitle.innerText = "at the Hoover Dam";
subtitle.id = "subtitle";
rootDiv.appendChild(subtitle);

// select all
let selectAllButton = document.createElement("button");
selectAllButton.id = "selectAllButton";
selectAllButton.innerHTML = "Add all to Cart";
selectAllButton.addEventListener("click", e => {
    for (let x = 0; x < products.length; x++) {
        let product = products[x];
        product.checkbox.checked = true;
    }
});
rootDiv.appendChild(selectAllButton);

// add selected
let addSelectedButton = document.createElement("button");
addSelectedButton.id = "addSelectedButton";
addSelectedButton.innerHTML = "Add Selected to Cart";
addSelectedButton.addEventListener("click", e => {
    let selectedList = products.filter(isChecked);
    selectedList.forEach(item => addPrice(item));
})
rootDiv.appendChild(addSelectedButton);

// cart display
let cartDiv = document.createElement("div");
cartDiv.id = "cartDiv";

let total = document.createElement("p");
total.innerHTML = `Total: $${totalPrice.toFixed(2)} (${itemTotal} items)`;
cartDiv.append(total);
rootDiv.appendChild(cartDiv);

/*let cartImg = document.createElement("img");
cartImg.id = "cartImg";
cartDiv.append(cartImg);
rootDiv.append(cartDiv);*/


// product list
let products = [
    cereal = {
        name: "Cereal",
        tag: "cereal",
        description: "Choice of Cheerios, Frosted Flakes, Froot Loops, and Raisin Bran. Milk sold separately.",
        price: 5.00,
        image: "./images/cereal.jpg",
        category: "Breakfast"
    },
    eggsBacon = {
        name: "Eggs and Bacon",
        tag: "eggsBacon",
        description: "Only sold until 11am. Quality not garaunteed.",
        price: 6.00,
        image: "./images/eggsBacon.jpg",
        category: "Breakfast"
    },
    milks = {
        name: "Milks",
        tag: "milks",
        description: "Choice of chocolate, whole, or skim milk.",
        price: 2.00,
        image: "./images/milks.jpg",
        category: "Beverages"
    },
    sodaFountain = {
        name: "Soda Fountain",
        tag: "sodaFountain",
        description: "Pepsi Soda Fountain.",
        price: 2.50,
        image: "./images/sodaFountain.jpg",
        category: "Beverages"
    },
    energyDrink = {
        name: "Energy Drink",
        tag: "energyDrink",
        description: "Sold out of your preferred brand.",
        price: 5.00,
        image: "./images/energyDrinks.jpg",
        category: "Beverages"
    },
    coffee = {
        name: "Coffee",
        tag: "coffee",
        description: "Lukewarm.",
        price: 2.50,
        image: "./images/coffee.jpg",
        category: "Beverages"
    },
    chips = {
        name: "Chips",
        tag: "chips",
        description: "The elevation makes the bags really puffy.",
        price: 2.50,
        image: "./images/chips.jpg",
        category: "Snacks"
    },
    candy = {
        name: "Movie Candies",
        tag: "candy",
        description: "Skittles, M&Ms, Snickers, Twix, 3 Musketeers, Hershey's Bar, Twizzlers, Junior Mints, Mike and Ike's.",
        price: 1.50,
        image: "./images/candy.jpg",
        category: "Candy"
    },
    neccoWafers = {
        name: "Necco Wafers",
        tag: "neccoWafers",
        description: "We bought a few bulk cases in 1993. Our mistake.",
        price: 0.05,
        image: "./images/neccoWafers.webp",
        category: "Candy"
    },
    beefJerky = {
        name: "Beef Jerky",
        tag: "beefJerky",
        description: "Your choice of \"Siracha\", \"Sweet Jalapeno\", \"Teriyaki\". and normal.",
        price: 5.00,
        image: "./images/beefJerky.jpg",
        category: "Snacks"
    },
    cashews = {
        name: "Cashews",
        tag: "cashews",
        description: "Your choice of \"Dill Pickle\", \"Cinnamon and Brown Sugar\", or \"Rosemary and Sea Salt\".",
        price: 3.00,
        image: "./images/cashews.jpg",
        category: "Snacks"
    },
    rxBars = {
        name: "RX Bars",
        tag: "rxBars",
        description: "We sell RX Bars.",
        price: 4.00,
        image: "./images/rxBars.jpg",
        category: "Snacks"
    },
    angelStatues = {
        name: "Angel Statues",
        tag: "angelStatues",
        description: "Just two big bronze statues. Nothing special about them. Rub their toes for good luck!",
        price: "Not Available for Sale",
        image: "./images/angelStatues.jpg",
        category: "Unspecified"
    },
    spartoi = {
        name: "Two Dudes",
        tag: "spartoi",
        description: "A couple of uniformed men who are definitely here on official business.",
        price: "Do Not Approach",
        image: "./images/spartoi.jpg",
        category: "Unspecified"
    },
    ophiotaurus = {
        name: "Bessie",
        tag: "ophiotaurus",
        description: "Ophiotaurus (Serpeant Bull).",
        price: "Please do not sacrifice his entrails as tribute for power.",
        image: "./images/ophiotaurus.jpg",
        category: "Unspecified"
    }
];

// render
products.filter(product => product.category !== "Unspecified").forEach(product => render(product));