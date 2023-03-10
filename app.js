const map_leaflet = L.map("map").setView([51.25, 0], 15);
const containerIP = document.querySelector("[data-IP]");
const containerLocation = document.querySelector("[data-Location]");
const containerTimezone = document.querySelector("[data-Timezone]");
const containerISP = document.querySelector("[data-ISP]");

const submitWroteAddress = document.querySelector("form");
const submitContent = document.querySelector("#searchBar");
const errorMessageBlock = document.querySelector("#ErrorMessage");
const errorMessageBlockCloseButton = document.querySelector("#closeButton");

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 40,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map_leaflet);

const mapPosIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [35, 45],
  iconAnchor: [40, 40],
});

submitWroteAddress.addEventListener("submit", (e) => {
  let API_New_Address = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_1yvTUi8OUizYIfLHnZkD4z1Ufihtk&ipAddress=${submitContent.value.trim()}`;
  submitContent.value = "";
  fetch(API_New_Address)
    .then((response) => response.json())
    .then((data) => dataTaking(data))
    .catch((error) => showErrorMessage(error));
  console.log(e);
  return false;
});

const dataTaking = (data) => {
  let IPtaken_ip = data.ip;
  let IPtaken_region = data.location.region;
  let IPtaken_country = data.location.country;
  let IPtaken_timezone = data.location.timezone;
  let IPtaken_isp = data.isp;
  let IPlat = data.location.lat;
  let IPlng = data.location.lng;
  console.log(IPtaken_ip);
  console.log(IPtaken_region);
  console.log(IPtaken_country);
  console.log(IPtaken_timezone);
  console.log(IPtaken_isp);
  console.log(IPlat);
  console.log(IPlng);
  console.log(data);
  containerIP.innerText = IPtaken_ip;
  containerISP.innerText = IPtaken_isp;
  containerTimezone.innerText = `UPC ${IPtaken_timezone}`;
  containerLocation.innerText = `${IPtaken_region} ,${IPtaken_country}`;
  map_leaflet.setView([IPlat, IPlng], 15);
  L.marker([IPlat, IPlng], { icon: mapPosIcon }).addTo(map_leaflet);
  L.marker([IPlat, IPlng], { icon: mapPosIcon })
    .addTo(map_leaflet)
    .bindPopup(`${IPtaken_ip} located here`);
  return;
};

const showErrorMessage = (e) => {
  errorMessageBlock.showModal(e);
};

errorMessageBlockCloseButton.addEventListener("click", () => {
  errorMessageBlock.close();
  errorMessageBlock.classList.remove("animate");
});
