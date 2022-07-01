'use strict';

const L = require(`leaflet`);
const {MapSetting} = require(`../constants`);
const {mapIconsConfig} = require(`../map-utils`);

const {
  tileLayer,
  nodes,
  backbone,
  cityNet,
  jkhNet,
} = require(`../main/layers`);

const {
  vokords,
  forsazhs,
  potoks,
  perekrestoks,
  radars,
  strelkas,
  places,
  checkedPlaces,
} = require(`./layers`);

mapIconsConfig();

const overlayMaps = {
  [`Узлы Магистрали`]: nodes.layer,
  [`ВОЛС Магистраль, ${backbone.distance} км`]: backbone.layer,
  [`ВОЛС СПД города, ${cityNet.distance} км`]: cityNet.layer,
  [`ВОЛС Дирекция ЖКХ, ${jkhNet.distance} км`]: jkhNet.layer,
  [`ФВФ Вокорды, ${vokords.quantity} шт`]: vokords.layer,
  [`ФВФ Форсажи, ${forsazhs.quantity} шт`]: forsazhs.layer,
  [`ФВФ Потоки, ${potoks.quantity} шт`]: potoks.layer,
  [`ФВФ Перекрестки, ${perekrestoks.quantity} шт`]: perekrestoks.layer,
  [`ФВФ Радары, ${radars.quantity} шт`]: radars.layer,
  [`ФВФ Стрелки, ${strelkas.quantity} шт`]: strelkas.layer,
  [`ФВФ места МВД, ${places.quantity} шт`]: places.layer,
  [`ФВФ выбранные места, ${checkedPlaces.quantity} шт`]: checkedPlaces.layer,
};

const checkedLayers = [
  backbone.layer,
  cityNet.layer,
  jkhNet.layer,
  vokords.layer,
  forsazhs.layer,
  potoks.layer,
  perekrestoks.layer,
  radars.layer,
  strelkas.layer,
  // places.layer,
  checkedPlaces.layer,
];

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: checkedLayers,
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);
