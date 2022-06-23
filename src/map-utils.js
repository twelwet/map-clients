'use strict';

const L = require(`leaflet`);
const {MapSetting} = require(`./constants`);

const getPinIcon = (iconPath) => L.icon({
  iconUrl: iconPath,
  iconSize: [30, 30],
  iconAnchor: [15, 20],
});


const mapIconsConfig = () => {
  const {icon, Marker} = L;
  const iconRetinaUrl = `images/marker.svg`;
  const iconUrl = `images/marker.svg`;
  const shadowUrl = `images/marker-shadow.svg`;

  Marker.prototype.options.icon = icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
};

const getTileLayer = () => {
  return L.tileLayer(MapSetting.LAYER_URL, {
    attribution: MapSetting.ATTRIBUTION,
    maxZoom: MapSetting.MAX_ZOOM,
    id: MapSetting.ID,
    tileSize: MapSetting.TILE_SIZE,
    zoomOffset: MapSetting.ZOOM_OFFSET,
    accessToken: MapSetting.ACCESS_TOKEN,
  });
};

const getFiberLayer = (fiberLines) => L.geoJSON(fiberLines, {
  onEachFeature: (feature, layer) => {
    if (feature.properties.description === undefined) {
      feature.properties.description = `Заполнить марку кабеля`;
    }
    layer.bindPopup(feature.properties.description);
  },
});

const getNodesPins = (nodes) => {
  const nodesPins = [];
  for (const node of nodes) {
    nodesPins.push(L.marker([node[`latitude`], node[`longitude`]]).bindPopup(`${node[`node_id`]} "${node[`name`]}" ${node[`address`]}`));
  }
  return nodesPins;
};

const getUniqueLocations = (data) => {
  const uniqueAddresses = [...new Set(data.map((item) => item[`address`]))];
  const uniqueLocations = [];

  for (const address of uniqueAddresses) {
    const client = data.find((item) => item[`address`] === address);
    uniqueLocations.push({
      address,
      latitude: client[`latitude`],
      longitude: client[`longitude`],
    });
  }

  for (const location of uniqueLocations) {
    location[`clients`] = data.filter((item) => item[`address`] === location[`address`]).map((item) => item[`name`]).sort();
  }

  return uniqueLocations;
};

const getClientsPins = (clients, iconPath, isMakeUniqueAddresses = true) => {
  const pinIcon = getPinIcon(iconPath);

  const clientsPins = [];
  const data = isMakeUniqueAddresses ? getUniqueLocations(clients) : clients;
  for (const location of data) {
    clientsPins
      .push(L.marker([location[`latitude`], location[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>${location[`address`]}:</b><br>${location[`clients`].map((item, i) => `${i + 1}. ${item}`).join(`<br> `)}`));
  }
  return clientsPins;
};

const getIvnPins = (ivnData, iconPath) => {
  const pinIcon = getPinIcon(iconPath);

  const ivnPins = [];
  for (const location of ivnData) {
    ivnPins
      .push(L.marker([location[`latitude`], location[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>${location[`description`]}</b><br>${location[`address`]}<br>${location[`name`]}`));
  }

  return ivnPins;
};

const getFvfPins = (fvfData, iconPath) => {
  const pinIcon = getPinIcon(iconPath);

  const fvfPins = [];
  for (const location of fvfData) {
    fvfPins
      .push(L.marker([location[`latitude`], location[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>${location[`model`]}</b><br>${location[`name`]}<br>${location[`description`]}<br>${location[`address`]}<br>${location[`contractor`]}`));
  }

  return fvfPins;
};

const getVokords = (data) => data.filter((item) => item[`model`].startsWith(`Вокорд`));
const getPotoks = (data) => data.filter((item) => item[`model`].startsWith(`Поток`));
const getForsazhs = (data) => data.filter((item) => item[`model`].startsWith(`Форсаж`));
const getPerekrestoks = (data) => data.filter((item) => item[`model`].startsWith(`Перекресток`));
const getRadars = (data) => data.filter((item) => item[`model`].startsWith(`MultаRadar`));

const getStrelkas = (data) => {
  const allStrelkas = data.filter((item) => item[`model`].startsWith(`Стрелка-М`));
  const strelkasWorked = allStrelkas.filter((item) => item[`is_work`] === `TRUE`);
  const strelkasDamaged = allStrelkas.filter((item) => item[`is_work`] === `FALSE`);
  return {
    strelkasWorked,
    strelkasDamaged,
  };
}
const getFvfPlaces = (data) => data.filter((item) => item[`name`].startsWith(`Предлагаемое`));

const getClients = (objects, isBuilt = `да`, isContracted = `да`) => objects
  .filter((item) => item[`is_built`] === isBuilt && item[`is_contracted`] === isContracted);

const getRemoteClients = (objects, isBuilt = `нет`, isContracted = `да`) => objects
  .filter((item) => item[`is_built`] === isBuilt && item[`is_contracted`] === isContracted);

const getUnClients = (objects, isBuilt = `да`, isContracted = `нет`) => objects
  .filter((item) => item[`is_built`] === isBuilt && item[`is_contracted`] === isContracted);

const getAllPlanningClients = (objects, isBuilt = `нет`, isContracted = `нет`, distanceLimit) => objects
  .filter((item) => item[`is_built`] === isBuilt && item[`is_contracted`] === isContracted && +item[`node_distance`] < distanceLimit);

const getPlan2022Clients = (objects) => objects
  .filter((item) => item[`plan_2022`] === `да`);

const getDistance = (item) => {
  const coordinates = item.feature.geometry.coordinates;
  let distance = 0;
  for (const i of coordinates.keys()) {
    if (i < coordinates.length - 1) {
      distance = distance + L.latLng(coordinates[i]).distanceTo(coordinates[i + 1]);
    }
  }
  return distance;
};

const getWholeDistance = (geoJsonLayer) => {
  const segments = geoJsonLayer.getLayers();
  let wholeDistance = 0;
  for (const segment of segments) {
    wholeDistance = wholeDistance + getDistance(segment);
  }
  return wholeDistance;
};

module.exports = {
  mapIconsConfig,
  getTileLayer,
  getFiberLayer,
  getNodesPins,
  getClientsPins,
  getIvnPins,
  getFvfPins,
  getWholeDistance,
  getClients,
  getRemoteClients,
  getUnClients,
  getAllPlanningClients,
  getPlan2022Clients,
  getVokords,
  getPotoks,
  getForsazhs,
  getPerekrestoks,
  getRadars,
  getStrelkas,
  getFvfPlaces,
};
