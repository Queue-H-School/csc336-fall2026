// initialize divs
let rootDiv = document.body.appendChild(document.createElement("div"));
rootDiv.id = "root";

let headerDiv = document.createElement("div");
headerDiv.id = "header";
rootDiv.appendChild(headerDiv);

let allProductsDiv = document.createElement("div");
allProductsDiv.id = "productsDiv";
rootDiv.appendChild(allProductsDiv);

document.body.style.background = "beige";

// clear all
let clearAllProducts = function () {
    allProductsDiv.innerHTML = "";

}

// add to cart
let totalPrice = 0;
let itemTotal = 0;

let renderCart = function () {
    let cartTotal = document.querySelector("#cartTotal");
    cartTotal.innerHTML = `Total: $${totalPrice.toFixed(2)} (${itemTotal} items)`;
}

let addPrice = function (product) {
    if (typeof (product.price) === "number") {
        totalPrice += product.price;
        itemTotal++;
    } else {
        itemTotal++;
    }
    renderCart();
}

let isChecked = function (product) {
    let checkbox = document.querySelector(`#${product.tag}Checkbox`);
    if (checkbox != null) {
        return checkbox.checked;
    }
}

// render
let renderHeader = function () {
    // title
    let titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";

    let title = document.createElement("h1");
    title.innerText = "The Dam Snack Bar";
    title.id = "title";
    titleDiv.appendChild(title);

    // subtitle
    let subtitle = document.createElement("h2");
    subtitle.innerText = "at the Hoover Dam";
    subtitle.id = "subtitle";
    titleDiv.appendChild(subtitle);
    headerDiv.appendChild(titleDiv);

    // add all
    let cartDiv = document.createElement("div");
    cartDiv.id = "cartDiv";

    let addAllButton = document.createElement("button");
    addAllButton.id = "addAllButton";
    addAllButton.innerHTML = "Add all to Cart";
    addAllButton.addEventListener("click", e => {
        for (let x = 0; x < products.length; x++) {
            addPrice(products[x]);
        }
    });
    cartDiv.appendChild(addAllButton);

    // add selected
    let addSelectedButton = document.createElement("button");
    addSelectedButton.id = "addSelectedButton";
    addSelectedButton.innerHTML = "Add Selected to Cart";
    addSelectedButton.addEventListener("click", e => {
        let selectedList = products.filter(product => isChecked(product));
        selectedList.forEach(item => {
            addPrice(item);
            console.log(item.name);
        });
    })
    cartDiv.appendChild(addSelectedButton);

    // create cart
    let total = document.createElement("p");
    total.id = "cartTotal"
    total.innerHTML = `Total: $${totalPrice.toFixed(2)} (${itemTotal} items)`;
    cartDiv.appendChild(total);
    headerDiv.appendChild(cartDiv);

    headerDiv.appendChild(titleDiv);

    /*let cartImg = document.createElement("img");
    cartImg.id = "cartImg";
    cartDiv.append(cartImg);
    rootDiv.append(cartDiv);*/

    // create dropdown
    let dropDown = document.createElement("select");
    dropDown.id = "dropDown";
    dropDown.name = "dropDown";
    let categoryList = ["All Categories", "Breakfast", "Beverages", "Candy", "Snacks", "Unspecified"];
    categoryList.forEach(category => {
        dropDown.add(new Option(category, category));
    });
    console.log(dropDown.options)

    dropDown.addEventListener("click", e => {
        let dropDown = document.querySelector(`#dropDown`);
        let currentSelection = dropDown.options[dropDown.selectedIndex].text;
        clearAllProducts()

        // if category = "all categories", render all (except unspecified)
        if (currentSelection === "All Categories") {
            products.filter(product => product.category !== "Unspecified").forEach(product => renderProduct(product));
        } else {
            // else, render only that category
            products.filter(product => product.category === currentSelection).forEach(product => renderProduct(product));
        }
    })
    headerDiv.appendChild(dropDown);
}

let renderProduct = function (product) {

    let productDiv = document.createElement("div");
    productDiv.classList.add("productDiv");
    productDiv.id = product.tag + "Div";

    // title and checkbox
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("productTitleDiv");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = product.tag + "Checkbox";
    checkbox.classList.add("checkbox");
    titleDiv.appendChild(checkbox);

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
        price.innerHTML = `<b>${product.price}</br>`;
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

    allProductsDiv.appendChild(productDiv);
}

// product list
let products = [
    cereal = {
        name: "Cereal",
        tag: "cereal",
        description: "Choice of Cheerios, Frosted Flakes, Froot Loops, and Raisin Bran. Milk sold separately.",
        price: 5.00,
        image: "./images/cereal.jpg",
        category: "Breakfast",
    },
    eggsBacon = {
        name: "Eggs and Bacon",
        tag: "eggsBacon",
        description: "Only sold until 11am. Quality not garaunteed.",
        price: 6.00,
        image: "./images/eggsBacon.jpg",
        category: "Breakfast",
    },
    milks = {
        name: "Milks",
        tag: "milks",
        description: "Choice of chocolate, whole, or skim milk.",
        price: 2.00,
        image: "./images/milks.jpg",
        category: "Beverages",
    },
    sodaFountain = {
        name: "Soda Fountain",
        tag: "sodaFountain",
        description: "Pepsi Soda Fountain.",
        price: 2.50,
        image: "./images/sodaFountain.jpg",
        category: "Beverages",
    },
    energyDrink = {
        name: "Energy Drink",
        tag: "energyDrink",
        description: "Sold out of your preferred brand.",
        price: 5.00,
        image: "./images/energyDrinks.jpg",
        category: "Beverages",
    },
    coffee = {
        name: "Coffee",
        tag: "coffee",
        description: "Lukewarm.",
        price: 2.50,
        image: "./images/coffee.jpg",
        category: "Beverages",
    },
    chips = {
        name: "Chips",
        tag: "chips",
        description: "The elevation makes the bags really puffy.",
        price: 2.50,
        image: "./images/chips.jpg",
        category: "Snacks",
    },
    candy = {
        name: "Movie Candies",
        tag: "candy",
        description: "Skittles, M&Ms, Snickers, Twix, 3 Musketeers, Hershey's Bar, Twizzlers, Junior Mints, Mike and Ike's.",
        price: 1.50,
        image: "./images/candy.jpg",
        category: "Candy",
    },
    neccoWafers = {
        name: "Necco Wafers",
        tag: "neccoWafers",
        description: "We bought a few bulk cases in 1993. Our mistake.",
        price: 0.05,
        image: "./images/neccoWafers.webp",
        category: "Candy",
    },
    beefJerky = {
        name: "Beef Jerky",
        tag: "beefJerky",
        description: "Your choice of \"Siracha\", \"Sweet Jalapeno\", \"Teriyaki\". and normal.",
        price: 5.00,
        image: "./images/beefJerky.jpg",
        category: "Snacks",
    },
    cashews = {
        name: "Cashews",
        tag: "cashews",
        description: "Your choice of \"Dill Pickle\", \"Cinnamon and Brown Sugar\", or \"Rosemary and Sea Salt\".",
        price: 3.00,
        image: "./images/cashews.jpg",
        category: "Snacks",
    },
    rxBars = {
        name: "RX Bars",
        tag: "rxBars",
        description: "We sell RX Bars.",
        price: 4.00,
        image: "./images/rxBars.jpg",
        category: "Snacks",
    },
    angelStatues = {
        name: "Angel Statues",
        tag: "angelStatues",
        description: "Just two big bronze statues. Nothing special about them. Rub their toes for good luck!",
        price: "Not Available for Sale",
        image: "./images/angelStatues.jpg",
        category: "Unspecified",
    },
    spartoi = {
        name: "Two Dudes",
        tag: "spartoi",
        description: "A couple of uniformed men who are definitely here on official business.",
        price: "Do Not Approach",
        image: "./images/spartoi.jpg",
        category: "Unspecified",
    },
    ophiotaurus = {
        name: "Bessie",
        tag: "ophiotaurus",
        description: "Ophiotaurus (Serpeant Bull).",
        price: "Please do not sacrifice his entrails as tribute for power.",
        image: "./images/ophiotaurus.jpg",
        category: "Unspecified",
    }
];

// render
renderHeader()
products.filter(product => product.category !== "Unspecified").forEach(product => renderProduct(product));
