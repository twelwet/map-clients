'use strict';

const L = require(`leaflet`);
const {getTileLayer} = require(`../map-utils`);
const {
  getFiberLayer,
  getPins,
  getWholeDistance,
} = require(`./utils`);

const {Icon} = require(`../constants`);

const {nodes, abNodes, backboneNet, cityNet, jkhNet} = require(`../../../data`);

const fiberLayerBackbone = getFiberLayer(backboneNet);
const fiberLayerCityNet = getFiberLayer(cityNet);
const fiberLayerJkhNet = getFiberLayer(jkhNet);

const tileLayer = getTileLayer();

const backboneDistance = (getWholeDistance(fiberLayerBackbone) / 1000).toFixed(0);
const cityNetDistance = (getWholeDistance(fiberLayerCityNet) / 1000).toFixed(0);
const jkhNetDistance = (getWholeDistance(fiberLayerJkhNet) / 1000).toFixed(0);

const nodesPins = getPins(nodes, Icon.Path.NODE);
const nodesLayer = L.layerGroup(nodesPins);

const abNodesPins = getPins(abNodes, Icon.Path.AB_NODE);
const abNodesLayer = L.layerGroup(abNodesPins);

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
  abNodes: {
    layer: abNodesLayer,
    quantity: abNodesPins.length,
  },
};
