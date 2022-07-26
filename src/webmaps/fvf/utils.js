'use strict';

const L = require(`leaflet`);
const {getPinIcon} = require(`../map-utils`);

const getVokords = (data) => data.filter((item) => item[`model`].startsWith(`Вокорд`));
const getPotoks = (data) => data.filter((item) => item[`model`].startsWith(`Поток`));
const getForsazhs = (data) => data.filter((item) => item[`model`].startsWith(`Форсаж`));
const getPerekrestoks = (data) => data.filter((item) => item[`model`].startsWith(`Перекресток`));
const getRadars = (data) => data.filter((item) => item[`model`].startsWith(`MultаRadar`));

const getStrelkas = (data) => {
  const allStrelkas = data.filter((item) => item[`model`].startsWith(`Стрелка-М`));
  const strelkasWorked = allStrelkas.filter((item) => item[`is_work`] === `TRUE`);
  const strelkasDamaged = allStrelkas.filter((item) => item[`is_work`] === `FALSE`);
  return {
    strelkasWorked,
    strelkasDamaged,
  };
};

const getFvfPlaces = (data) => data.filter((item) => item[`id`].startsWith(`FVF-PLC`));

const getFvfCheckedPlaces = (data) => data.filter((item) => item[`is_checked`]);

const getFvfPriorityPlaces = (data, level) => data.filter((item) => item[`priority_level`] === level);

const getLinesLayer = (lines, color) => L.geoJSON(lines, {
  style: () => ({
    color,
    [`weight`]: 10,
  }),
  onEachFeature: (feature, layer) => {
    layer.bindPopup(`<b>Приоритет ${feature[`data`][`priority_level`]}</b><br>Место №${feature[`data`][`id`].slice(7)}<br>${feature[`data`][`name`]}<br>Тип дороги: "${feature[`data`][`road_type`]}"<br>${feature[`data`][`address`]}<br><b>${feature[`data`][`description`]}</b><br>${feature[`data`][`contractor`]}`);
  },
});

const getFvfPins = (fvfData, iconPath) => {
  const pinIcon = getPinIcon(iconPath);

  const fvfPins = [];
  for (const location of fvfData) {
    fvfPins
      .push(L.marker([location[`latitude`], location[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>${location[`model`]}</b><br>${location[`name`]}<br>${location[`description`]}<br>Тип дороги: "${location[`road_type`]}"<br>${location[`address`]}<br>${location[`contractor`]}`));
  }

  return fvfPins;
};

const getPlacesFvfPins = (fvfData, iconPath) => {
  const pinIcon = getPinIcon(iconPath);

  const fvfPins = [];
  for (const feature of fvfData) {
    fvfPins
      .push(L.marker([feature[`latitude`], feature[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>Приоритет ${feature[`priority_level`]}</b><br>Место №${feature[`id`].slice(7)}<br>${feature[`name`]}<br>Тип дороги: "${feature[`road_type`]}"<br>${feature[`address`]}<br><b>${feature[`description`]}</b><br>${feature[`contractor`]}`));
  }

  return fvfPins;
};


module.exports = {
  getVokords,
  getPotoks,
  getForsazhs,
  getPerekrestoks,
  getRadars,
  getStrelkas,
  getFvfPlaces,
  getFvfCheckedPlaces,
  getFvfPriorityPlaces,
  getLinesLayer,
  getFvfPins,
  getPlacesFvfPins,
};
