'use strict';

const L = require(`leaflet`);
const {getPinIcon} = require(`../map-utils`);

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

module.exports = {
  getIvnPins,
};
