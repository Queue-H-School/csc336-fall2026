let toCamelCase = function (str) {
    // catches uppercase and start of word
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
        // remove spaces
    }).replace(/\s+/g, '');
}

// local storage
let localStorageKey = "products";
let newLocalProducts = [];

// clear local storage
let clearLocalStorage = function () {
    localStorage.removeItem(localStorageKey);

    location.reload();
}

// initialize divs
let rootDiv = document.querySelector("#root");
let allProductsDiv = document.querySelector("#productsDiv");

let formDiv = document.createElement("div");
formDiv.id = "formDiv";

let categoryList = ["Breakfast", "Beverages", "Candy", "Snacks", "Unspecified"];

// product list
let productList = [
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
        tag: "eggsAndBacon",
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
        tag: "movieCandies",
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
        tag: "twoDudes",
        description: "A couple of uniformed men who are definitely here on official business.",
        price: "Do Not Approach",
        image: "./images/spartoi.jpg",
        category: "Unspecified",
    },
    ophiotaurus = {
        name: "Bessie",
        tag: "bessie",
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

// render header div
let renderHeader = function () {
    let headerDiv = document.querySelector("#headerDiv");

    // add new product
    let newProductButton = document.querySelector("#addNewProductButton");
    newProductButton.addEventListener("click", e => {
        if (!document.querySelector("#formDiv")) {
            renderAddInventory()
        }
    });

    // reset store
    let resetStoreButton = document.querySelector("#resetStoreButton");
    resetStoreButton.addEventListener("click", e => {
        clearLocalStorage()
    })

    // add all
    let addAllButton = document.querySelector("#addAllButton");
    addAllButton.addEventListener("click", e => {
        for (let x = 0; x < productList.length; x++) {
            addPrice(productList[x]);
        }
    });

    // add selected
    let addSelectedButton = document.querySelector("#addSelectedButton");
    addSelectedButton.addEventListener("click", e => {
        let selectedList = productList.filter(product => isChecked(product));
        selectedList.forEach(item => {
            addPrice(item);
        });
    })

    // create cart
    let total = document.querySelector("#cartTotal");
    total.innerHTML = `Total: $${totalPrice.toFixed(2)} (${itemTotal} items)`;

    /*let cartImg = document.createElement("img");
    cartImg.id = "cartImg";
    cartDiv.append(cartImg);
    rootDiv.append(cartDiv);*/

    // create dropdown
    let dropDown = getCategorySelect("customerSelect");
    dropDown.add(new Option("All Categories", "All Categories"), 0);
    headerDiv.appendChild(dropDown);
    dropDown.addEventListener("click", e => {
        let dropDown = document.querySelector(`#customerSelect`);
        let currentSelection = dropDown.options[dropDown.selectedIndex].text;
        clearAllProducts()

        // if category = "all categories", render all (except unspecified)
        if (currentSelection === "All Categories") {
            productList.filter(product => product.category !== "Unspecified").forEach(product => renderProduct(product));
        } else {
            // else, render only that category
            productList.filter(product => product.category === currentSelection).forEach(product => renderProduct(product));
        }
    })
}

// render one product
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

// render (almost) all
let renderAllProducts = function () {
    productList.filter(product => product.category !== "Unspecified").forEach(product => renderProduct(product));
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

// validate form (check descirption length)
let validateForm = function (values) {
    return values[1].length >= 20 && values[1].length <= 150;
}

// parse form to product
let formToProduct = function (event, values) {

    let newProduct = {
        name: values[0],
        tag: toCamelCase(values[0]),
        description: values[1],
        price: Number(values[2]),
        image: values[3],
        category: values[4],
    }
    addProduct(newProduct);

    // clear form
    formDiv.innerHTML = "";
    formDiv.remove();
}

let addProduct = function (newProduct) {
    newLocalProducts.push(newProduct);

    // add to local storage
    let jsonProducts = JSON.stringify(newLocalProducts);
    localStorage.setItem(localStorageKey, jsonProducts);

    productList.push(newProduct);
    renderProduct(newProduct);
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
    inventoryForm.name = "inventoryForm";
    formDiv.appendChild(inventoryForm);

    let nameInput = document.createElement("input");
    nameInput.id = "nameInput";
    nameInput.name = "nameInput";
    nameInput.classList.add("formInput")
    nameInput.type = "text";
    nameInput.placeholder = "Product Name"
    inventoryForm.appendChild(nameInput);

    // description
    let descriptionInput = document.createElement("input");
    descriptionInput.id = "descriptionInput";
    descriptionInput.name = "descriptionInput";
    descriptionInput.classList.add("formInput")
    descriptionInput.type = "textarea";
    descriptionInput.placeholder = "Product Description";
    inventoryForm.appendChild(descriptionInput);

    // price
    let priceInput = document.createElement("input");
    priceInput.id = "priceInput";
    priceInput.name = "priceInput";
    priceInput.classList.add("formInput")
    priceInput.type = "number";
    priceInput.min = "0";
    priceInput.step = "0.01";
    priceInput.placeholder = "Product Price";
    inventoryForm.appendChild(priceInput);

    // image
    let imageInput = document.createElement("input");
    imageInput.id = "imageInput";
    imageInput.name = "imageInput";
    imageInput.classList.add("formInput")
    imageInput.type = "url";
    imageInput.placeholder = "Product Image";
    inventoryForm.appendChild(imageInput);

    // category
    let dropDown = getCategorySelect("inventorySelect");
    dropDown.classList.add("formInput");
    inventoryForm.appendChild(dropDown);

    // submit
    let submitInput = document.createElement("input");
    submitInput.id = "submitInput";
    submitInput.name = "submitInput";
    submitInput.classList.add("formInput");
    submitInput.type = "submit";
    submitInput.value = "Submit";
    inventoryForm.appendChild(submitInput);

    inventoryForm.addEventListener("submit", event => {
        event.preventDefault();
        let form = new FormData(inventoryForm, submitInput);

        // entries() iterator needs to be an array
        let values = [...form.values()];
        
        if (validateForm(values)) {
            formToProduct(event, values);
        } else {
            // description error msg
            if (!document.querySelector("#errorMsg")) {
                let errorMsg = document.createElement("p");
                errorMsg.id = "errorMsg";
                errorMsg.innerHTML = "Product description must be between 20 and 150 characters.";
                formDiv.appendChild(errorMsg);
            }
        }
    });
}

// add to cart
let totalPrice = 0;
let itemTotal = 0;

// render cart values
let renderCart = function () {
    let cartTotal = document.querySelector("#cartTotal");
    cartTotal.innerHTML = `Total: $${totalPrice.toFixed(2)} (${itemTotal} items)`;
}

// add item to cart
let addPrice = function (product) {
    if (typeof (product.price) === "number") {
        totalPrice += product.price;
        itemTotal++;
    } else {
        itemTotal++;
    }
    renderCart();
}

// helper function for checkbox
let isChecked = function (product) {
    let checkbox = document.querySelector(`#${product.tag}Checkbox`);
    if (checkbox != null) {
        return checkbox.checked;
    }
}

// document event listener
document.addEventListener('DOMContentLoaded', event => {
    let localStorageData = localStorage.getItem(localStorageKey);
    // update productList if needed
    if (localStorageData !== null) {
        let localProducts = JSON.parse(localStorageData);

        for (let newProduct of localProducts) {
            addProduct(newProduct);
        }
    }
});

// start here
renderHeader()
renderAllProducts()