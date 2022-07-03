'use strict';

const L = require(`leaflet`);
const {getPinIcon} = require(`../map-utils`);

const getTrafficLightsPins = (data, iconPath) => {
  const pinIcon = getPinIcon(iconPath);

  const pins = [];
  for (const location of data) {
    pins
      .push(L.marker([location[`latitude`], location[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>${location[`name`]}</b><br>${location[`address`]}</br>Инсталляция: ${location[`installation`]} руб.</br>Абон. плата: ${location[`subscription`]} руб./мес`));
  }

  return pins;
};

const getNodesPins = (nodes) => {
  const nodesPins = [];
  for (const node of nodes) {
    nodesPins.push(L.marker([node[`latitude`], node[`longitude`]])
      .bindPopup(`<b>${node[`name`]}</b><br>${node[`address`]}</br>Инсталляция: ${node[`installation`]} руб.</br>Абон. плата: ${node[`subscription`]} руб./мес`));
  }
  return nodesPins;
};


module.exports = {
  getTrafficLightsPins,
  getNodesPins,
};
