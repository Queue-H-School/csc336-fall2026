// import lodash library for camelCase
// const _ = require('lodash');

// initialize divs
let rootDiv = document.body.appendChild(document.createElement("div"));
rootDiv.id = "root";

let headerDiv = document.createElement("div");
headerDiv.id = "header";
rootDiv.appendChild(headerDiv);

let allProductsDiv = document.createElement("div");
allProductsDiv.id = "productsDiv";
rootDiv.appendChild(allProductsDiv);

let formDiv = document.createElement("div");
formDiv.id = "formDiv";

document.body.style.background = "beige";
let categoryList = ["Breakfast", "Beverages", "Candy", "Snacks", "Unspecified"];

// product list
let products = [
    cereal = {
        name: "Cereal",
        tag: this.name.replace(" ", ""),
        description: "Choice of Cheerios, Frosted Flakes, Froot Loops, and Raisin Bran. Milk sold separately.",
        price: 5.00,
        image: "./images/cereal.jpg",
        category: "Breakfast",
    },
    eggsBacon = {
        name: "Eggs and Bacon",
        tag: this.name.replace(" ", ""),
        description: "Only sold until 11am. Quality not garaunteed.",
        price: 6.00,
        image: "./images/eggsBacon.jpg",
        category: "Breakfast",
    },
    milks = {
        name: "Milks",
        tag: this.name.replace(" ", ""),
        description: "Choice of chocolate, whole, or skim milk.",
        price: 2.00,
        image: "./images/milks.jpg",
        category: "Beverages",
    },
    sodaFountain = {
        name: "Soda Fountain",
        tag: this.name.replace(" ", ""),
        description: "Pepsi Soda Fountain.",
        price: 2.50,
        image: "./images/sodaFountain.jpg",
        category: "Beverages",
    },
    energyDrink = {
        name: "Energy Drink",
        tag: this.name.replace(" ", ""),
        description: "Sold out of your preferred brand.",
        price: 5.00,
        image: "./images/energyDrinks.jpg",
        category: "Beverages",
    },
    coffee = {
        name: "Coffee",
        tag: this.name.replace(" ", ""),
        description: "Lukewarm.",
        price: 2.50,
        image: "./images/coffee.jpg",
        category: "Beverages",
    },
    chips = {
        name: "Chips",
        tag: this.name.replace(" ", ""),
        description: "The elevation makes the bags really puffy.",
        price: 2.50,
        image: "./images/chips.jpg",
        category: "Snacks",
    },
    candy = {
        name: "Movie Candies",
        tag: this.name.replace(" ", ""),
        description: "Skittles, M&Ms, Snickers, Twix, 3 Musketeers, Hershey's Bar, Twizzlers, Junior Mints, Mike and Ike's.",
        price: 1.50,
        image: "./images/candy.jpg",
        category: "Candy",
    },
    neccoWafers = {
        name: "Necco Wafers",
        tag: this.name.replace(" ", ""),
        description: "We bought a few bulk cases in 1993. Our mistake.",
        price: 0.05,
        image: "./images/neccoWafers.webp",
        category: "Candy",
    },
    beefJerky = {
        name: "Beef Jerky",
        tag: this.name.replace(" ", ""),
        description: "Your choice of \"Siracha\", \"Sweet Jalapeno\", \"Teriyaki\". and normal.",
        price: 5.00,
        image: "./images/beefJerky.jpg",
        category: "Snacks",
    },
    cashews = {
        name: "Cashews",
        tag: this.name.replace(" ", ""),
        description: "Your choice of \"Dill Pickle\", \"Cinnamon and Brown Sugar\", or \"Rosemary and Sea Salt\".",
        price: 3.00,
        image: "./images/cashews.jpg",
        category: "Snacks",
    },
    rxBars = {
        name: "RX Bars",
        tag: this.name.replace(" ", ""),
        description: "We sell RX Bars.",
        price: 4.00,
        image: "./images/rxBars.jpg",
        category: "Snacks",
    },
    angelStatues = {
        name: "Angel Statues",
        tag: this.name.replace(" ", ""),
        description: "Just two big bronze statues. Nothing special about them. Rub their toes for good luck!",
        price: "Not Available for Sale",
        image: "./images/angelStatues.jpg",
        category: "Unspecified",
    },
    spartoi = {
        name: "Two Dudes",
        tag: this.name.replace(" ", ""),
        description: "A couple of uniformed men who are definitely here on official business.",
        price: "Do Not Approach",
        image: "./images/spartoi.jpg",
        category: "Unspecified",
    },
    ophiotaurus = {
        name: "Bessie",
        tag: this.name.replace(" ", ""),
        description: "Ophiotaurus (Serpeant Bull).",
        price: "Please do not sacrifice his entrails as tribute for power.",
        image: "./images/ophiotaurus.jpg",
        category: "Unspecified",
    }
];


// clear all
let clearAllProducts = function () {
    allProductsDiv.innerHTML = "";
}

// render (almost) all
let renderAllProducts = function () {
    products.filter(product => product.category !== "Unspecified").forEach(product => renderProduct(product));
}

// get category select
let getCategorySelect = function (id) {
    let dropDown = document.createElement("select");
    dropDown.id = id;
    dropDown.name = id;
    categoryList.forEach(category => {
        dropDown.add(new Option(category, category));
    });
    return dropDown;
}

// add results from form to product list
let addProduct = function (event) {
    event.preventDefault();

    let productName = document.querySelector("#nameInput").value;
    let productDescription = document.querySelector("#descriptionInput").value;
    let productImage = document.querySelector("#imageInput").value;
    let productPrice = document.querySelector("#priceInput").value;

    let productCategory = document.querySelector("#categorySelect");
    productCategory = productCategory.options[productCategory.selectedIndex].text;

    let newProduct = {
        name: productName,
        tag: this.name.replace(" ", ""),
        description: productDescription,
        price: productPrice,
        image: productImage,
        category: productCategory,
    }

    products.push(newProduct);
    formDiv.innerHTML = "";
    clearAllProducts();
    renderAllProducts();
}

// create inventory popup
let renderAddInventory = function () {
    rootDiv.appendChild(formDiv);

    // form header
    let formHeader = document.createElement("div");
    formHeader.id = "formHeaderDiv";

    let heading = document.createElement("h3");
    heading.innerText = "Add a New Product";
    heading.id = "formHeading";
    formHeader.appendChild(heading)
    formDiv.appendChild(formHeader);


    // generate form
    let inventoryForm = document.createElement("form");
    inventoryForm.id = "inventoryForm";

    let nameInput = document.createElement("input");
    nameInput.id = "nameInput";
    nameInput.classList.add("formInput")
    nameInput.type = "text";
    nameInput.placeholder = "Product Name"
    inventoryForm.appendChild(nameInput);

    // description
    let descriptionInput = document.createElement("input");
    descriptionInput.id = "descriptionInput";
    descriptionInput.classList.add("formInput")
    descriptionInput.type = "textarea";
    descriptionInput.placeholder = "Product Description";
    inventoryForm.appendChild(descriptionInput);

    // image
    let imageInput = document.createElement("input");
    imageInput.id = "imageInput";
    imageInput.classList.add("formInput")
    imageInput.type = "url";
    imageInput.placeholder = "Product Image";
    inventoryForm.appendChild(imageInput);

    // price
    let priceInput = document.createElement("input");
    priceInput.id = "priceInput";
    priceInput.classList.add("formInput")
    priceInput.type = "number";
    priceInput.placeholder = "Product Price";
    inventoryForm.appendChild(priceInput);

    // category
    let dropDown = getCategorySelect("inventorySelect");
    inventoryForm.appendChild(dropDown);

    // submit
    let submitInput = document.createElement("input");
    submitInput.id = "submitInput";
    submitInput.classList.add("formInput");
    submitInput.type = "submit";
    submitInput.value = "Submit";
    inventoryForm.appendChild(submitInput);

    inventoryForm.addEventListener("submit", event => addProduct(event));
    formDiv.appendChild(inventoryForm);
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

    // add new product
    let addNewProduct = document.createElement("div");
    addNewProduct.id = "addNewProduct";

    let newProductButton = document.createElement("button");
    newProductButton.id = "newProductButton";
    newProductButton.innerHTML = "Add a New Product";
    newProductButton.addEventListener("click", e => {
        if (!document.querySelector("#formDiv")) {
            renderAddInventory()
        }
    });
    addNewProduct.appendChild(newProductButton);
    headerDiv.appendChild(addNewProduct);

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
    let dropDown = getCategorySelect("customerSelect");
    dropDown.add(new Option("All Categories", "All Categories"), 0);

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
// render
renderHeader()
renderAllProducts()