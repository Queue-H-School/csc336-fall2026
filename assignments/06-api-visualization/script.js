const IP_URL = "https://presend.pages.dev/api/ip";
let ipObj;

/* trace
{
  "ip": "149.88.18.205",
  "city": "Ashburn",
  "region": "Virginia",
  "country": "US",
  "continent": "NA",
  "latitude": "39.04372",
  "longitude": "-77.48749",
  "postal": "20147",
  "timezone": "America/New_York",
  "asn": 212238,
  "org": "Datacamp Limited",
  "currency": "USD",
  "language": "en",
  "is_eu": false,
  "tor": {
    "checked": true,
    "is_tor": false
  }
}
*/

let UA_URL = "https://presend.pages.dev/api/user-agent";
let uaObj;
/* presend user-agent
{
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:158.0) Gecko/20100101 Firefox/158.0",
  "parsed": {
    "browser": "Firefox",
    "browser_version": "158.0",
    "os": "macOS",
    "os_version": "10",
    "device_type": "desktop",
    "is_bot": false
  }
 */

document.body.style.background = "black";

// replace dashes in organization
function replacePunctuation(string) {
    // \w did not cover dashes for some reason
    let nonalpha = new RegExp("[^A-Za-z0-9]", "g");
    return string.replaceAll(nonalpha, " ");
}

// returns [date, time]
function getDate() {
    let date = new Date(Date.now());
    let dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let timeOptions = {
        hour12: false
    }
    let dateStr = date.toLocaleDateString(undefined, dateOptions);
    let timeStr = date.toLocaleTimeString(undefined, timeOptions);

    return [dateStr, timeStr];
}

async function getTrace() {
    // api call
    let response = await fetch(IP_URL);

    // update global variable
    ipObj = await response.json();
    console.log(ipObj);
}

async function getPresend() {
    // api call
    let response = await fetch(UA_URL);

    // update global var
    uaObj = await response.json();
    uaObj = uaObj.parsed;
    console.log(uaObj);
}

// update header
async function updateHeader() {
    await getTrace();
    ipText = document.querySelector("#ipText");
    ipText.innerHTML = ipObj.ip;
}

updateHeader();

// leaflet
async function leaflet() {
    // run after cloudflare trace resolves
    await getTrace();

    // init map
    let map = L.map('mapDiv', {
        center: [Number(ipObj.latitude), Number(ipObj.longitude)],
        zoom: 12
    })

    // open street map seems to be the default tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // no need for attribution bc this is not production but why not
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
    let date = datetime[0];
    let time = datetime[1];

    let dateElement = document.getElementById('date');
    dateElement.innerHTML = date;

    let timeElement = document.getElementById('time');
    timeElement.innerHTML = time;

    // ip obj
    // get location
    let location = document.getElementById('location');
    location.innerHTML = `${ipObj.city}, ${ipObj.region}, ${ipObj.country}`;

    // get organization
    let organizationElement = document.getElementById('organization');
    organizationElement.innerHTML = `Organization: ${replacePunctuation(ipObj.org)}`;

    // get tor status
    let torElement = document.getElementById('tor');
    // if checked, show status
    if (ipObj.tor.checked) {
        torElement.innerHTML = `Tor Endpoint: ${ipObj.tor.is_tor}`;
    } else {
        // if not checked, show unknown
        torElement.innerHTML = `Tor: Unknown`;
    }

    // ua obj
    // get device
    let deviceElement = document.getElementById('device');
    deviceElement.innerHTML = `${uaObj.browser} on ${uaObj.os} ${uaObj.device_type}`;

    // get bot status
    let botElement = document.getElementById('bot');
    botElement.innerHTML = `Bot: ${uaObj.is_bot}`;
}

async function main() {
    // repeatedly run after cloudflare trace resolves
    await getTrace();
    await getPresend();
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
