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

const getFvfPlaces = (data) => data.filter((item) => item[`name`].startsWith(`Предлагаемое`));

const getFvfCheckedPlaces = (data) => data.filter((item) => item[`is_checked`]);

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

module.exports = {
  getVokords,
  getPotoks,
  getForsazhs,
  getPerekrestoks,
  getRadars,
  getStrelkas,
  getFvfPlaces,
  getFvfCheckedPlaces,
  getFvfPins,
};
