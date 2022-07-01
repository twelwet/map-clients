'use strict';

const L = require(`leaflet`);
const {Icon} = require(`../../constants`);
const {fvfData} = require(`../../../data`);

const {
  getVokords,
  getPotoks,
  getForsazhs,
  getPerekrestoks,
  getRadars,
  getStrelkas,
  getFvfPlaces,
  getFvfCheckedPlaces,
  getFvfPins,
} = require(`../../map-utils`);

const vokords = getVokords(fvfData);
const potoks = getPotoks(fvfData);
const forsazhs = getForsazhs(fvfData);
const perekrestoks = getPerekrestoks(fvfData);
const radars = getRadars(fvfData);
const {strelkasWorked, strelkasDamaged} = getStrelkas(fvfData);
const places = getFvfPlaces(fvfData);
const checkedPlaces = getFvfCheckedPlaces(fvfData);

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

const checkedPlacesPins = getFvfPins(checkedPlaces, Icon.Path.FVF_CHECKED_PLACES);
const checkedPlacesLayer = L.layerGroup(checkedPlacesPins);

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
  places: {
    layer: placesLayer,
    quantity: placesPins.length,
  },
  checkedPlaces: {
    layer: checkedPlacesLayer,
    quantity: checkedPlacesPins.length,
  },
};
