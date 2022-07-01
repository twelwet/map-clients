'use strict';

const L = require(`leaflet`);
const {getPinIcon} = require(`../map-utils`);

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

module.exports = {
  getClients,
  getRemoteClients,
  getUnClients,
  getAllPlanningClients,
  getPlan2022Clients,
  getClientsPins,
};
