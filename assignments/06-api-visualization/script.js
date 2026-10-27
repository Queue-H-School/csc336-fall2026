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
}

leaflet();

// p5 setup (runs once automatically)
async function setup() {
    // run after cloudflare trace resolves
    await getIP();

    let canvas = createCanvas(600, 625);
    canvas.parent("contentDiv");

    textFont('Space Mono');
}

// p5 draw (runs once per second automatically)
function draw() {
    background(50);


}
