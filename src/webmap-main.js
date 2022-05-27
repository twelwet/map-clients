'use strict';

const L = require(`leaflet`);
const {MapSetting} = require(`./constants`);
const {
  mapIconsConfig,
  getTileLayer,
  getFiberLayer,
  getNodesPins,
  getWholeDistance,
} = require(`./map-utils`);

const {nodes, backboneNet, cityNet, jkhNet} = require(`../data`);

mapIconsConfig();

const nodesPins = getNodesPins(nodes);
const nodesLayer = L.layerGroup(nodesPins);

const fiberLayerBackbone = getFiberLayer(backboneNet);
const fiberLayerCityNet = getFiberLayer(cityNet);
const fiberLayerJkhNet = getFiberLayer(jkhNet);

const tileLayer = getTileLayer();

const backboneDistance = (getWholeDistance(fiberLayerBackbone) / 1000).toFixed(0);
const cityNetDistance = (getWholeDistance(fiberLayerCityNet) / 1000).toFixed(0);
const jkhNetDistance = (getWholeDistance(fiberLayerJkhNet) / 1000).toFixed(0);

const overlayMaps = {
  [`Узлы Магистрали`]: nodesLayer,
  [`ВОЛС Магистраль, ${backboneDistance} км`]: fiberLayerBackbone,
  [`ВОЛС СПД города, ${cityNetDistance} км`]: fiberLayerCityNet,
  [`ВОЛС Дирекция ЖКХ, ${jkhNetDistance} км`]: fiberLayerJkhNet,
};

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: [nodesLayer, fiberLayerBackbone],
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);

