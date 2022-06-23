'use strict';

const L = require(`leaflet`);
const {MapSetting, Icon} = require(`./constants`);
const {
  mapIconsConfig,
  getTileLayer,
  getFiberLayer,
  getNodesPins,
  getWholeDistance,
  getIvnPins,
} = require(`./map-utils`);

const {nodes, backboneNet, cityNet, jkhNet, ivnBoxes, ivnMunBoxes, ivnCameras, ivnMunCameras} = require(`../data`);

const ivnCamerasStatic = ivnCameras.filter((item) => item[`description`].includes(`Стационарная`));
const ivnCamerasDynamic = ivnCameras.filter((item) => item[`description`].includes(`Поворотная`));

const ivnMunCamerasStatic = ivnMunCameras.filter((item) => item[`description`].includes(`Стационарная`));
const ivnMunCamerasDynamic = ivnMunCameras.filter((item) => item[`description`].includes(`Поворотная`));

mapIconsConfig();

const nodesPins = getNodesPins(nodes);
const nodesLayer = L.layerGroup(nodesPins);

const ivnBoxesPins = getIvnPins(ivnBoxes, Icon.Path.IVN_BOX);
const ivnBoxesLayer = L.layerGroup(ivnBoxesPins);

const ivnMunBoxesPins = getIvnPins(ivnMunBoxes, Icon.Path.IVN_BOX);
const ivnMunBoxesLayer = L.layerGroup(ivnMunBoxesPins);

const ivnCamerasStaticPins = getIvnPins(ivnCamerasStatic, Icon.Path.IVN_CAMERA_STATIC);
const ivnCamerasDynamicPins = getIvnPins(ivnCamerasDynamic, Icon.Path.IVN_CAMERA_DYNAMIC);
const ivnCamerasPins = [...ivnCamerasStaticPins, ...ivnCamerasDynamicPins];
const ivnCamerasLayer = L.layerGroup(ivnCamerasPins);

const ivnMunCamerasStaticPins = getIvnPins(ivnMunCamerasStatic, Icon.Path.IVN_CAMERA_STATIC);
const ivnMunCamerasDynamicPins = getIvnPins(ivnMunCamerasDynamic, Icon.Path.IVN_CAMERA_DYNAMIC);
const ivnMunCamerasPins = [...ivnMunCamerasStaticPins, ...ivnMunCamerasDynamicPins];
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
  layers: [fiberLayerBackbone, fiberLayerCityNet, fiberLayerJkhNet, ivnMunCamerasLayer, ivnMunBoxesLayer],
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);
