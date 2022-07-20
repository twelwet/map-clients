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
  getPlacesFvfPins,
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

const priorityPlaces = {
  one: {
    quantity: fvfLinesPriorityOne.length,
    layer: L.layerGroup([
      ...getLinesLayer(fvfLinesPriorityOne, `#ff0000`).getLayers(),
      ...getPlacesFvfPins(priorityOnePlaces, Icon.Path.FVF_PRIORITY_ONE),
    ]),
  },
  two: {
    quantity: fvfLinesPriorityTwo.length,
    layer: L.layerGroup([
      ...getLinesLayer(fvfLinesPriorityTwo, `#ff7f00`).getLayers(),
      ...getPlacesFvfPins(priorityTwoPlaces, Icon.Path.FVF_PRIORITY_TWO),
    ]),
  },
  three: {
    quantity: fvfLinesPriorityThree.length,
    layer: L.layerGroup([
      ...getLinesLayer(fvfLinesPriorityThree, `#ccc000`).getLayers(),
      ...getPlacesFvfPins(priorityThreePlaces, Icon.Path.FVF_PRIORITY_THREE),
    ]),
  },
  four: {
    quantity: fvfLinesPriorityFour.length,
    layer: L.layerGroup([
      ...getLinesLayer(fvfLinesPriorityFour, `#bbb`).getLayers(),
      ...getPlacesFvfPins(priorityFourPlaces, Icon.Path.FVF_PRIORITY_FOUR),
    ]),
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
};
