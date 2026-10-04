let rootDiv = document.body.appendChild(document.createElement("div"));
rootDiv.id = "root";

// homepage

// title
let title = document.createElement("h1");
title.innerText = "The Dam Snack Bar";
title.id = "title";

// subtitle
let subtitle = document.createElement("h2");
subtitle.innerText = "at the Hoover Dam";
subtitle.id = "subtitle";

// product list
let products = [{
    cereal: {
        name: "Cereal",
        description: "Choice of Cheerios, Frosted Flakes, Froot Loops, and Raisin Bran. Milk sold separately",
        price: 5,
        image: "tbd",
        category: "Breakfast"
    },
    eggs_bacon: {
        name: "Eggs and Bacon",
        description: "Only sold until 11am. Quality not garaunteed.",
        price: 6,
        image: "tbd",
        category: "Breakfast"
    },
    milk: {
        name: "Milks",
        description: "Choice of chocolate, whole, or skim milk.",
        price: 2,
        image: "tbd",
        category: "Beverages"
    },
    soda_fountain: {
        name: "Soda Fountain",
        description: "Pepsi Soda Fountain",
        price: 2.5,
        image: "tbd",
        category: "Beverages"
    },
    energy_drink: {
        name: "Energy Drink",
        description: "Sold out of your preferred brand.",
        price: 5,
        image: "tbd",
        category: "Beverages"
    },
    coffee: {
        name: "Coffee",
        description: "Lukewarm.",
        price: 2.5,
        image: "tbd",
        category: "Beverages"
    },
    chips: {
        name: "Chips",
        description: "The elevation makes the bags really puffy.",
        price: 2.5,
        image: "tbd",
        category: "Snacks"
    },
    candy: {
        name: "Movie Candies",
        description: "Skittles, M&Ms, Snickers, Twix, 3 Musketeers, Hershey's Bar, Twizzlers, Junior Mints, Mike and Ike's",
        price: 1.5,
        image: "tbd",
        category: "Candy"
    },
    necco_wafers: {
        name: "Necco Wafers",
        description: "We bought a few bulk cases in 1993. Our mistake.",
        price: "0.05",
        category: "Candy"
    },
    beef_jerky: {
        name: "Beef Jerky",
        description: "Your choice of \"Siracha\", \"Sweet Jalapeno\", \"Teriyaki\". and normal.",
        price: 5,
        image: "tbd",
        category: "Snacks"
    },
    cashews: {
        name: "Cashews",
        description: "Your choice of \"Dill Pickle\", \"Cinnamon and Brown Sugar\", or \"Rosemary and Sea Salt\".",
        price: 3,
        image: "tbd",
        category: "Snacks"
    },
    rx_bars: {
        name: "RX Bars",
        description: "We sell RX Bars",
        price: 4,
        image: "tbd",
        category: "Snacks"
    },
    angel_statues: {
        name: "Angel Statues",
        description: "Just two big bronze statues. Nothing special about them. Rub their toes for good luck!",
        price: "Not Available for Sale",
        image: "tbd",
        category: "Unspecified"
    },
    spartoi: {
        name: "Two Dudes",
        description: "A couple of uniformed men who are definitely here on official business.",
        price: "Do Not Approach",
        image: "tbd",
        category: "Unspecified"
    },
    orphiotaurus: {
        name: "Bessie",
        description: "Orphiotaurus (Serpeant Bull)",
        price: "Please do not sacrifice his entrails as tribute for power.",
        image: "tbd",
        category: "Unspecified"
    }
}];