const URL = "https://speed.cloudflare.com/meta";
let ipObj;

/*
{
  "hostname": "speed.cloudflare.com",
  "clientIp": "69.193.168.152",
  "httpProtocol": "HTTP/1.1",
  "asn": 13254,
  "asOrganization": "My Organisation",
  "colo": "JFK",
  "country": "US",
  "city": "New York City",
  "region": "New York",
  "postalCode": "10001",
  "latitude": "40.730610",
  "longitude": "-73.935242"
}
*/

document.body.style.background = "black";

// returns [date, time]
function getDate() {
    let date = new Date(Date.now());
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let dateStr = date.toLocaleDateString(undefined, options);
    let timeStr = date.toLocaleTimeString();

    return [dateStr, timeStr];
}

async function getIP() {
    // api call
    let response = await fetch(URL);

    // update global variable
    ipObj = await response.json();
}

// update header
async function updateHeader() {
    await getIP();
    ipText = document.querySelector("#ipText");
    ipText.innerHTML = ipObj.clientIp;
}

updateHeader();

// leaflet
async function leaflet() {
    // run after cloudflare trace resolves
    await getIP();

    // init map
    let map = L.map('mapDiv', {
        center: [Number(ipObj.latitude), Number(ipObj.longitude)],
        zoom: 12
    })

    // open street map seems to be the default tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // no need for attribution bc this is not production
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // popup
    var popup = L.popup()
        .setLatLng(L.latLng(Number(ipObj.latitude), Number(ipObj.longitude)))
        .setContent(`<p>(${ipObj.latitude}, ${ipObj.longitude})</p>`)
        .openOn(map);
}

leaflet();

// p5 setup (runs once automatically)
async function displayInfo() {

    let infoDiv = document.getElementById('infoDiv');
    infoDiv.style.background = "#373737"


    // get datetime
    let datetime = getDate();
    let dateElement = document.getElementById('datetime');
    dateElement.innerHTML = `${datetime[0]}\n${datetime[1]}`;

    // get location
    let location = document.getElementById('location');
    location.innerHTML = `${ipObj.city}, ${ipObj.region}, ${ipObj.country}`;

    // get organization
    let organization = document.getElementById('organization');
    organization.innerHTML = `${ipObj.asOrganization}`;

}

async function main() {
    // repeatedly run after cloudflare trace resolves
    await getIP();
    setInterval(displayInfo, 1000);
}

main()

// p5 draw (runs once per second automatically)
function draw() {

    // p5 design constants
    let textWhite = color(204); // same as #CCCCCC
    let textMedium = 24;
    let mutedRed = color(203, 76, 78);

    background(50);

    textFont('Space Mono');

    // info outline
    fill(mutedRed)


    text(`${dateStr}`, 10, 35)

    // data display text
    fill(textWhite)
    textSize(textMedium)


}
