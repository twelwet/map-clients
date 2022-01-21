'use strict';

const L = require(`leaflet`);
const {MapSetting, Icon, DISTANCE_LIMIT} = require(`./constants`);
const {mapIconsConfig, getTileLayer, getFiberLayer, getNodesPins, getPins, getWholeDistance} = require(`./map-utils`);

const nodes = require(`../data/result/nodes`);
const objects = require(`../data/result/objects`);
const fiberLinesBackbone = require(`../data/result/fiber-lines`);
const fiberLinesCityNet = require(`../data/result/fiber-lines-city-net`);

mapIconsConfig();

const nodesPins = getNodesPins(nodes);
const nodesLayer = L.layerGroup(nodesPins);

const clientsPins = getPins(objects, `да`, `да`, Icon.Path.CLIENT, false, 0);
const clientsLayer = L.layerGroup(clientsPins);

const remoteClientsPins = getPins(objects, `нет`, `да`, Icon.Path.REMOTE_CLIENT, false, 0);
const remoteClientsLayer = L.layerGroup(remoteClientsPins);

const unClientsPins = getPins(objects, `да`, `нет`, Icon.Path.UN_CLIENT, false, 0);
const unClientsLayer = L.layerGroup(unClientsPins);

const buildClientsPins = getPins(objects, `нет`, `нет`, Icon.Path.PLAN_TO_BUILD, true, DISTANCE_LIMIT);
const buildClientsLayer = L.layerGroup(buildClientsPins);

const fiberLayerBackbone = getFiberLayer(fiberLinesBackbone);
const fiberLayerCityNet = getFiberLayer(fiberLinesCityNet);

const tileLayer = getTileLayer();

const backboneDistance = (getWholeDistance(fiberLayerBackbone) / 1000).toFixed(0);
const cityNetDistance = (getWholeDistance(fiberLayerCityNet) / 1000).toFixed(0);

const overlayMaps = {
  [`Узлы`]: nodesLayer,
  [`ВОЛС Магистраль, ${backboneDistance} км`]: fiberLayerBackbone,
  [`ВОЛС СПД города, ${cityNetDistance} км`]: fiberLayerCityNet,
  [`Подключены, адресов: ${clientsPins.length}`]: clientsLayer,
  [`Удаленные объекты, адресов: ${remoteClientsPins.length}`]: remoteClientsLayer,
  [`Не подкл., адресов: ${unClientsPins.length}`]: unClientsLayer,
  [`План, адресов: ${buildClientsPins.length}`]: buildClientsLayer,
};

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: [nodesLayer, fiberLayerBackbone, clientsLayer, unClientsLayer],
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);

