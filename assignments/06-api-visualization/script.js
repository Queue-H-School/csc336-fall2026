const IP_URL = "https://presend.pages.dev/api/ip";
let ipObj;

/* trace
{
  "ip": "",
  "city": "",
  "region": "",
  "country": "",
  "continent": "",
  "latitude": "",
  "longitude": "",
  "postal": "",
  "timezone": "",
  "asn": ,
  "org": "",
  "currency": "",
  "language": "",
  "is_eu": ,
  "tor": {
    "checked": ,
    "is_tor":
  }
}
*/

let UA_URL = "https://presend.pages.dev/api/user-agent";
let uaObj;
/* presend user-agent
{
  "user_agent": "",
  "parsed": {
    "browser": "",
    "browser_version": "",
    "os": "",
    "os_version": "",
    "device_type": "",
    "is_bot":
  }
 */

document.body.style.background = "black";
let darkGray = "#272727";

// replace dashes in organization
function replacePunctuation(string) {
    console.log("replacePunctuation");
    // \w did not cover dashes for some reason
    let nonalpha = new RegExp("[^A-Za-z0-9]", "g");
    return string.replaceAll(nonalpha, " ");
}

// updates datetime in infoDiv
function getDate() {
    console.log("getDate");
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

    let dateElement = document.getElementById('date');
    dateElement.innerHTML = dateStr;

    let timeElement = document.getElementById('time');
    timeElement.innerHTML = timeStr;

}

async function getTrace() {
    console.log("IP API");
    // api call
    let response = await fetch(IP_URL);

    // update global variable
    ipObj = await response.json();
    console.log(ipObj);
}

async function getPresend() {
    console.log("UA API");
    // api call
    let response = await fetch(UA_URL);

    // update global var
    uaObj = await response.json();
    uaObj = uaObj.parsed;
    console.log(uaObj);
}

// update header
function updateHeader() {
    console.log("updateHeader");
    ipText = document.querySelector("#ipText");
    ipText.innerHTML = ipObj.ip;
}

// leaflet
function leaflet() {
    console.log("leaflet");

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

// p5 setup (runs once automatically)
function displayInfo() {
    console.log("displayInfo");

    let infoDiv = document.getElementById('infoDiv');
    infoDiv.style.background = darkGray;

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

    // get versions
    let osVersionElement = document.getElementById('osVersion');
    osVersionElement.innerHTML = `${uaObj.os} version: ${uaObj.os_version}`;

    let browserVersionElement = document.getElementById('browserVersion');
    browserVersionElement.innerHTML = `${uaObj.browser} version: ${uaObj.browser_version}`;

    // get bot status
    let botElement = document.getElementById('bot');
    botElement.innerHTML = `Bot: ${uaObj.is_bot}`;
}

async function main() {
    // repeatedly run
    setInterval(getDate, 1000);

    await getTrace();
    updateHeader();
    leaflet();
    await getPresend();
    displayInfo();
}

main()