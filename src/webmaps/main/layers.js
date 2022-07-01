'use strict';

const L = require(`leaflet`);
const {getTileLayer} = require(`../map-utils`);
const {
  getFiberLayer,
  getNodesPins,
  getWholeDistance,
} = require(`./utils`);

const {nodes, backboneNet, cityNet, jkhNet} = require(`../../../data`);

const fiberLayerBackbone = getFiberLayer(backboneNet);
const fiberLayerCityNet = getFiberLayer(cityNet);
const fiberLayerJkhNet = getFiberLayer(jkhNet);

const tileLayer = getTileLayer();

const backboneDistance = (getWholeDistance(fiberLayerBackbone) / 1000).toFixed(0);
const cityNetDistance = (getWholeDistance(fiberLayerCityNet) / 1000).toFixed(0);
const jkhNetDistance = (getWholeDistance(fiberLayerJkhNet) / 1000).toFixed(0);

const nodesPins = getNodesPins(nodes);
const nodesLayer = L.layerGroup(nodesPins);

module.exports = {
  tileLayer,
  backbone: {
    layer: fiberLayerBackbone,
    distance: backboneDistance
  },
  cityNet: {
    layer: fiberLayerCityNet,
    distance: cityNetDistance
  },
  jkhNet: {
    layer: fiberLayerJkhNet,
    distance: jkhNetDistance
  },
  nodes: {
    layer: nodesLayer,
    quantity: nodesPins.length
  },
};
