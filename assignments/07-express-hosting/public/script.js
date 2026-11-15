let rootDiv = document.getElementById("rootDiv");
let resultsDiv = document.getElementById("resultsDiv");
document.body.style.background = "#001524";

// writing to local storage would be helpful, but gets a little more complicated than id like
// set up some sort of database to hold a list of objects per country
// before fetching from apis, check database first
let airportList = [];

let GEOSEARCH = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&layer=address&";

class Airport {
    constructor(data, location, latlng) {

        this.name = data.attributes.name;
        this.iata = data.attributes.iata_code;
        this.latlng = latlng;
        this.type = fromCamelCase(data.attributes.type);

        // if no location (429 violation), then just skip it
        this.locationFlag = location ? true : false;
        if (this.locationFlag) {
            if (!location.address.city) {
                this.city = "";
            } else {
                this.city = location.address.city + ", ";
            }

            this.country = location.address.country;
            this.display = location.display_name;
        }
        this.makeTile();
    }

    makeTile() {
        // heading
        let tileDiv = document.createElement("div");
        tileDiv.classList.add("airportTile");
        tileDiv.id = this.id + "TileDiv";
        resultsDiv.appendChild(tileDiv);

        let title = document.createElement("h3");
        title.classList.add("tileTitle");
        title.innerHTML = this.name;
        tileDiv.appendChild(title);

        let iata = document.createElement("p");
        iata.classList.add("redText");
        iata.innerHTML = this.iata;
        tileDiv.appendChild(iata);

        // add location info, if exists
        if (this.locationFlag) {
            let locationDiv = document.createElement("div");
            locationDiv.classList.add("locationDiv");
            tileDiv.appendChild(locationDiv);

            let city = document.createElement("p");
            city.classList.add("city");
            city.innerHTML = `${this.city}${this.country}`;
            locationDiv.appendChild(city);

            let latlng = document.createElement("p");
            latlng.classList.add("latlng");
            latlng.innerHTML = `${this.latlng.lat}, ${this.latlng.lon}`;
            locationDiv.appendChild(latlng);
        }

        let type = document.createElement("p");
        type.classList.add("tileType");
        type.innerHTML = this.type;
        tileDiv.appendChild(type);
    }

}

function fromCamelCase(str) {
    // replace first char
    let firstChar = str.charAt(0);
    str = firstChar.toUpperCase() + str.substring(1);

    // replace _ with space and uppercase next char
    while (str.indexOf("_") > -1) {
        let underscoreIndex = str.indexOf("_");
        let nextChar = str.charAt(underscoreIndex + 1);
        str = str.substring(0, underscoreIndex) + " " + nextChar.toUpperCase() + str.substring(underscoreIndex + 2);
    }
    return str;

}

async function main() {

    // get results
    let countryForm = document.getElementById("countryForm");
    countryForm.addEventListener('submit', async e => {
        e.preventDefault();
        let country = document.getElementById("countryInput").value;
        await getCountryAirports(country);
    });
}

// adds results to list as an object
async function parseResultList(resultList) {
    let violationFlag = false;


    for (let aObj of resultList) {
        let location; // default value so it reads as empty in the constructor


        let latlng = {
            lat: Number(aObj.attributes.latitude).toFixed(5),
            lon: Number(aObj.attributes.longitude).toFixed(5)
        };

        if (!violationFlag) {
            // wait 2.5 secs between
            setTimeout(2500)
            location = await coordInfo(latlng);

            // catch violation
            if (location.status === 429) {
                console.log("Too many Nominatim requests. Location data will not be loaded.")
                violationFlag = true;
            }
        }

        // make new obj
        let temp = new Airport(aObj, location, latlng);
        airportList.push(temp);
    }
}

// get coord info
async function coordInfo(latlng) {
    // fetch in front-end to prevent bulk-download CORS block
    let resLocation = await fetch(GEOSEARCH + `lat=${latlng.lat}&lon=${latlng.lon}`);
    // catch usage overload
    // TODO: this isn't working whyyyyy
    if (resLocation.status === 429) {
        return false;
    }
    return await resLocation.json();
}

// search by country
async function getCountryAirports(country) {

    let resAirports = await fetch("/countries", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({country: country})
    });
    let resultList = await resAirports.json();
    parseResultList(resultList.data);

    // get the next page from first list
    while (resultList.links.next) {
        let resNextPage = await fetch("/nextpage", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({link: resultList.links.next})
        });
        resultList = await resNextPage.json();
        parseResultList(resultList.data);
    }
}

main();