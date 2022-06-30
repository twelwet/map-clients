'use strict';

const L = require(`leaflet`);
const {MapSetting, Icon} = require(`./constants`);
const {
  mapIconsConfig,
  getTileLayer,
  getFiberLayer,
  getWholeDistance,
  getTrafficLightsPins,
} = require(`./map-utils`);

const {backboneNet, cityNet, jkhNet, trafficLightsData} = require(`../data`);

mapIconsConfig();

const trafficLightsPins = getTrafficLightsPins(trafficLightsData, Icon.Path.TRAFFIC_LIGHT);
const trafficLightsLayer = L.layerGroup(trafficLightsPins);

const fiberLayerBackbone = getFiberLayer(backboneNet);
const fiberLayerCityNet = getFiberLayer(cityNet);
const fiberLayerJkhNet = getFiberLayer(jkhNet);

const tileLayer = getTileLayer();

const backboneDistance = (getWholeDistance(fiberLayerBackbone) / 1000).toFixed(0);
const cityNetDistance = (getWholeDistance(fiberLayerCityNet) / 1000).toFixed(0);
const jkhNetDistance = (getWholeDistance(fiberLayerJkhNet) / 1000).toFixed(0);

const overlayMaps = {
  [`ВОЛС Магистраль, ${backboneDistance} км`]: fiberLayerBackbone,
  [`ВОЛС СПД города, ${cityNetDistance} км`]: fiberLayerCityNet,
  [`ВОЛС Дирекция ЖКХ, ${jkhNetDistance} км`]: fiberLayerJkhNet,
  [`Светофоры, ${trafficLightsPins.length} шт`]: trafficLightsLayer,
};

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: [fiberLayerBackbone, fiberLayerCityNet, fiberLayerJkhNet, trafficLightsLayer],
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);

