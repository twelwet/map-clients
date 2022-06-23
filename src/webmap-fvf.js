'use strict';

const L = require(`leaflet`);
const {MapSetting, Icon} = require(`./constants`);
const {
  mapIconsConfig,
  getTileLayer,
  getFiberLayer,
  getNodesPins,
  getWholeDistance,
  getFvfPins,
  getVokords,
  getPotoks,
  getForsazhs,
  getPerekrestoks,
  getRadars,
  getStrelkas,
  getFvfPlaces,
} = require(`./map-utils`);

const {nodes, backboneNet, cityNet, jkhNet, fvfData} = require(`../data`);

mapIconsConfig();

const vokords = getVokords(fvfData);
const potoks = getPotoks(fvfData);
const forsazhs = getForsazhs(fvfData);
const perekrestoks = getPerekrestoks(fvfData);
const radars = getRadars(fvfData);
const {strelkasWorked, strelkasDamaged} = getStrelkas(fvfData);
const places = getFvfPlaces(fvfData);

const nodesPins = getNodesPins(nodes);
const nodesLayer = L.layerGroup(nodesPins);

const vokordsPins = getFvfPins(vokords, Icon.Path.VOKORD);
const vokordsLayer = L.layerGroup(vokordsPins);

const forsazhsPins = getFvfPins(forsazhs, Icon.Path.FORSAZH);
const forsazhsLayer = L.layerGroup(forsazhsPins);

const potoksPins = getFvfPins(potoks, Icon.Path.POTOK);
const potoksLayer = L.layerGroup(potoksPins);

const perekrestoksPins = getFvfPins(perekrestoks, Icon.Path.PEREKRESTOK);
const perekrestoksLayer = L.layerGroup(perekrestoksPins);

const radarsPins = getFvfPins(radars, Icon.Path.RADAR);
const radarsLayer = L.layerGroup(radarsPins);

const strelkasWorkedPins = getFvfPins(strelkasWorked, Icon.Path.STRELKA);
const strelkasDamagedPins = getFvfPins(strelkasDamaged, Icon.Path.STRELKA_DAMAGED);
const strelkasPins = [...strelkasWorkedPins, ...strelkasDamagedPins];
const strelkasLayer = L.layerGroup(strelkasPins);

const placesPins = getFvfPins(places, Icon.Path.FVF_PLACES);
const placesLayer = L.layerGroup(placesPins);

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
  [`ФВФ Вокорды, ${vokordsPins.length} шт`]: vokordsLayer,
  [`ФВФ Форсажи, ${forsazhsPins.length} шт`]: forsazhsLayer,
  [`ФВФ Потоки, ${potoksPins.length} шт`]: potoksLayer,
  [`ФВФ Перекрестки, ${perekrestoksPins.length} шт`]: perekrestoksLayer,
  [`ФВФ Радары, ${radarsPins.length} шт`]: radarsLayer,
  [`ФВФ Стрелки, ${strelkasPins.length} шт`]: strelkasLayer,
  [`ФВФ места МВД, ${placesPins.length} шт`]: placesLayer,
};

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: [
    fiberLayerBackbone,
    fiberLayerCityNet,
    fiberLayerJkhNet,
    vokordsLayer,
    forsazhsLayer,
    potoksLayer,
    perekrestoksLayer,
    radarsLayer,
    strelkasLayer,
    placesLayer,
  ],
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);
