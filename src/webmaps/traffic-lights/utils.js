'use strict';

const L = require(`leaflet`);
const {getPinIcon} = require(`../map-utils`);

const getTrafficLightsPins = (data, iconPath) => {
  const pinIcon = getPinIcon(iconPath);

  const pins = [];
  for (const location of data) {
    pins
      .push(L.marker([location[`latitude`], location[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>${location[`id`]}</b><br>${location[`address`]}`));
  }

  return pins;
};

module.exports = {
  getTrafficLightsPins
};
