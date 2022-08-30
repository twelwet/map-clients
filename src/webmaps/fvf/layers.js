'use strict';

const L = require(`leaflet`);
const {Icon} = require(`../constants`);
const {fvfData, fvfLines} = require(`../../../data`);

const {
  getVokords,
  getPotoks,
  getForsazhs,
  getPerekrestoks,
  getRadars,
  getStrelkas,
  getCordons,
  getFvfPins,
  getLinesLayer,
} = require(`./utils`);

const vokords = getVokords(fvfData);
const potoks = getPotoks(fvfData);
const forsazhs = getForsazhs(fvfData);
const perekrestoks = getPerekrestoks(fvfData);
const radars = getRadars(fvfData);
const {strelkasWorked, strelkasDamaged} = getStrelkas(fvfData);
const cordons = getCordons(fvfData);

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

const cordonsPins = getFvfPins(cordons, Icon.Path.CORDON);
const cordonsLayer = L.layerGroup(cordonsPins);

const priorityPlaces = {
  one: {
    quantity: fvfLines.priorityOne.length,
    layer: L.layerGroup(getLinesLayer(fvfLines.priorityOne, `#ff0000`).getLayers()),
  },
  two: {
    quantity: fvfLines.priorityTwo.length,
    layer: L.layerGroup(getLinesLayer(fvfLines.priorityTwo, `#ff7f00`).getLayers()),
  },
  three: {
    quantity: fvfLines.priorityThree.length,
    layer: L.layerGroup(getLinesLayer(fvfLines.priorityThree, `#ccc000`).getLayers()),
  },
  four: {
    quantity: fvfLines.priorityFour.length,
    layer: L.layerGroup(getLinesLayer(fvfLines.priorityFour, `#bbb`).getLayers()),
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
  cordons: {
    layer: cordonsLayer,
    quantity: cordonsPins.length,
  },
  priorityPlaces,
};
