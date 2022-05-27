'use strict';

const L = require(`leaflet`);
const {MapSetting, Icon, DISTANCE_LIMIT} = require(`./constants`);
const {
  mapIconsConfig,
  getTileLayer,
  getFiberLayer,
  getNodesPins,
  getPins,
  getWholeDistance,
  getClients,
  getRemoteClients,
  getUnClients,
  getAllPlanningClients,
  getPlan2022Clients,
} = require(`./map-utils`);

const {nodes, objects, backboneNet, cityNet, jkhNet} = require(`../data`);

mapIconsConfig();

const nodesPins = getNodesPins(nodes);
const nodesLayer = L.layerGroup(nodesPins);

const clients = getClients(objects);
const remoteClients = getRemoteClients(objects);
const unClients = getUnClients(objects);
const allPlanningClients = getAllPlanningClients(objects, `нет`, `нет`, DISTANCE_LIMIT);
const plan2022Clients = getPlan2022Clients(objects);

const clientsPins = getPins(clients, Icon.Path.CLIENT);
const clientsLayer = L.layerGroup(clientsPins);

const remoteClientsPins = getPins(remoteClients, Icon.Path.REMOTE_CLIENT);
const remoteClientsLayer = L.layerGroup(remoteClientsPins);

const unClientsPins = getPins(unClients, Icon.Path.UN_CLIENT);
const unClientsLayer = L.layerGroup(unClientsPins);

const allPlanningClientsPins = getPins(allPlanningClients, Icon.Path.PLAN_TO_BUILD);
const allPlanningClientsLayer = L.layerGroup(allPlanningClientsPins);

const plan2022ClientsPins = getPins(plan2022Clients, Icon.Path.PLAN_2022);
const plan2022ClientsLayer = L.layerGroup(plan2022ClientsPins);

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
  [`Подключены, адресов: ${clientsPins.length}`]: clientsLayer,
  [`Удаленные объекты, адресов: ${remoteClientsPins.length}`]: remoteClientsLayer,
  [`Не подкл., адресов: ${unClientsPins.length}`]: unClientsLayer,
  [`План-2022, адресов: ${plan2022ClientsPins.length}`]: plan2022ClientsLayer,
  [`Глобальный план, адресов: ${allPlanningClientsPins.length}`]: allPlanningClientsLayer,
};

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: [fiberLayerBackbone, clientsLayer, remoteClientsLayer],
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);

