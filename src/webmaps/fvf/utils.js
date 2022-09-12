'use strict';

const L = require(`leaflet`);
const {getPinIcon} = require(`../map-utils`);

const getVokords = (data) => data.filter((item) => item[`model`].startsWith(`Вокорд`));
const getPotoks = (data) => data.filter((item) => item[`model`].startsWith(`Поток`));
const getForsazhs = (data) => data.filter((item) => item[`model`].startsWith(`Форсаж`));
const getPerekrestoks = (data) => data.filter((item) => item[`model`].startsWith(`Перекресток`));
const getRadars = (data) => data.filter((item) => item[`model`].startsWith(`MultаRadar`));

const getCordons = (data) => {
  const allCordons = data.filter((item) => item[`model`].startsWith(`Кордон`));
  const cordonsOnline = allCordons.filter((item) => item[`is_online`] === `TRUE`);
  const cordonsOffline = allCordons.filter((item) => item[`is_online`] === `FALSE`);
  return {cordonsOnline, cordonsOffline};
};

const getStrelkas = (data) => {
  const allStrelkas = data.filter((item) => item[`model`].startsWith(`Стрелка-М`));
  const strelkasWorked = allStrelkas.filter((item) => item[`is_work`] === `TRUE`);
  const strelkasDamaged = allStrelkas.filter((item) => item[`is_work`] === `FALSE`);
  return {
    strelkasWorked,
    strelkasDamaged,
  };
};

const getLinesLayer = (lines, color) => L.geoJSON(lines, {
  style: () => ({
    color,
    [`weight`]: 10,
  }),
  onEachFeature: (feature, layer) => {
    layer.bindPopup(`Предлагаемое место МВД №${feature[`data`][`id`].slice(7)}<br>${feature[`data`][`address`]}<br>Приоритетность: ${feature[`data`][`priority_level`]}<br>ДТП-Погибло-Ранено: ${feature[`data`][`accidents_died_injured`]}`);
  },
});

const getFvfPins = (fvfData, iconPath) => {
  const pinIcon = getPinIcon(iconPath);

  const fvfPins = [];
  for (const location of fvfData) {
    fvfPins
      .push(L.marker([location[`latitude`], location[`longitude`]], {icon: pinIcon})
        .bindPopup(`<b>${location[`model`]}</b><br>${location[`name`]} ${location[`description`]}<br>Адрес: ${location[`address`]}<br>${location[`power_supply_type`]} / ${location[`power_supply_provider`]}<br><b>${location[`info`]}</b>`));
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
  getCordons,
  getLinesLayer,
  getFvfPins,
  getPlacesFvfPins,
};
