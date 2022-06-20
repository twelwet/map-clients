'use strict';

const L = require(`leaflet`);
const {MapSetting, Icon} = require(`./constants`);
const {
  mapIconsConfig,
  getTileLayer,
  getFiberLayer,
  getNodesPins,
  getWholeDistance,
  getPins,
} = require(`./map-utils`);

const {nodes, backboneNet, cityNet, jkhNet, ivnBoxes, ivnMunBoxes, ivnCameras, ivnMunCameras} = require(`../data`);

mapIconsConfig();

const nodesPins = getNodesPins(nodes);
const nodesLayer = L.layerGroup(nodesPins);

const ivnBoxesPins = getPins(ivnBoxes, Icon.Path.IVN_BOX, false);
const ivnBoxesLayer = L.layerGroup(ivnBoxesPins);

const ivnMunBoxesPins = getPins(ivnMunBoxes, Icon.Path.IVN_BOX, false);
const ivnMunBoxesLayer = L.layerGroup(ivnMunBoxesPins);

const ivnCamerasPins = getPins(ivnCameras, Icon.Path.CLIENT, false);
const ivnCamerasLayer = L.layerGroup(ivnCamerasPins);

const ivnMunCamerasPins = getPins(ivnMunCameras, Icon.Path.CLIENT, false);
const ivnMunCamerasLayer = L.layerGroup(ivnMunCamerasPins);

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
  [`ИВН-РМ-ТКШ, ${ivnBoxesPins.length} шт`]: ivnBoxesLayer,
  [`ИВН-РМ-Камеры ${ivnCamerasPins.length} шт`]: ivnCamerasLayer,
  [`ИВН-МУН-ТКШ ${ivnMunBoxesPins.length} шт`]: ivnMunBoxesLayer,
  [`ИВН-МУН-Камеры ${ivnMunCamerasPins.length} шт`]: ivnMunCamerasLayer,
};

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: [fiberLayerBackbone, fiberLayerCityNet, fiberLayerJkhNet, ivnCamerasLayer],
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);
