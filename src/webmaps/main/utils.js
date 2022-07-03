'use strict';

const L = require(`leaflet`);

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
    nodesPins.push(L.marker([node[`latitude`], node[`longitude`]]).bindPopup(`${node[`id`]} "${node[`name`]}" ${node[`address`]}`));
  }
  return nodesPins;
};

module.exports = {
  getFiberLayer,
  getNodesPins,
  getWholeDistance,
};
