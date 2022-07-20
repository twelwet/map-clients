'use strict';

const L = require(`leaflet`);
const {Icon} = require(`../constants`);
const {fvfData, fvfLinesPriorityOne, fvfLinesPriorityTwo, fvfLinesPriorityThree, fvfLinesPriorityFour} = require(`../../../data`);

const {
  getVokords,
  getPotoks,
  getForsazhs,
  getPerekrestoks,
  getRadars,
  getStrelkas,
  getFvfPlaces,
  getFvfPriorityPlaces,
  getLinesLayer,
  getFvfPins,
} = require(`./utils`);

const vokords = getVokords(fvfData);
const potoks = getPotoks(fvfData);
const forsazhs = getForsazhs(fvfData);
const perekrestoks = getPerekrestoks(fvfData);
const radars = getRadars(fvfData);
const {strelkasWorked, strelkasDamaged} = getStrelkas(fvfData);
const places = getFvfPlaces(fvfData);
const priorityOnePlaces = getFvfPriorityPlaces(places, `1`);
const priorityTwoPlaces = getFvfPriorityPlaces(places, `2`);
const priorityThreePlaces = getFvfPriorityPlaces(places, `3`);
const priorityFourPlaces = getFvfPriorityPlaces(places, `4`);

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

const priorityOnePlacesPins = getFvfPins(priorityOnePlaces, Icon.Path.FVF_PRIORITY_ONE);
const priorityOnePlacesLayer = L.layerGroup(priorityOnePlacesPins);

const priorityTwoPlacesPins = getFvfPins(priorityTwoPlaces, Icon.Path.FVF_PRIORITY_TWO);
const priorityTwoPlacesLayer = L.layerGroup(priorityTwoPlacesPins);

const priorityThreePlacesPins = getFvfPins(priorityThreePlaces, Icon.Path.FVF_PRIORITY_THREE);
const priorityThreePlacesLayer = L.layerGroup(priorityThreePlacesPins);

const priorityFourPlacesPins = getFvfPins(priorityFourPlaces, Icon.Path.FVF_PRIORITY_FOUR);
const priorityFourPlacesLayer = L.layerGroup(priorityFourPlacesPins);

const priorityPlaces = {
  one: {
    quantity: priorityOnePlacesPins.length,
    layer: priorityOnePlacesLayer,
  },
  two: {
    quantity: priorityTwoPlacesPins.length,
    layer: priorityTwoPlacesLayer,
  },
  three: {
    quantity: priorityThreePlacesPins.length,
    layer: priorityThreePlacesLayer,
  },
  four: {
    quantity: priorityFourPlacesPins.length,
    layer: priorityFourPlacesLayer,
  },
};

const priorityLines = {
  one: {
    quantity: fvfLinesPriorityOne.length,
    layer: getLinesLayer(fvfLinesPriorityOne, `#ff0000`),
  },
  two: {
    quantity: fvfLinesPriorityTwo.length,
    layer: getLinesLayer(fvfLinesPriorityTwo, `#ff7f00`),
  },
  three: {
    quantity: fvfLinesPriorityThree.length,
    layer: getLinesLayer(fvfLinesPriorityThree, `#ccc000`),
  },
  four: {
    quantity: fvfLinesPriorityFour.length,
    layer: getLinesLayer(fvfLinesPriorityFour, `#bbb`),
  },
};

module.exports = {
  vokords: {
    layer: vokordsLayer,
    quantity: vokordsPins.length,
  },
  forsazhs: {
    layer: forsazhsLayer,
    quantity: forsazhsPins.length,
  },
  potoks: {
    layer: potoksLayer,
    quantity: potoksPins.length,
  },
  perekrestoks: {
    layer: perekrestoksLayer,
    quantity: perekrestoksPins.length,
  },
  radars: {
    layer: radarsLayer,
    quantity: radarsPins.length,
  },
  strelkas: {
    layer: strelkasLayer,
    quantity: strelkasPins.length,
  },
  priorityPlaces,
  priorityLines,
};
