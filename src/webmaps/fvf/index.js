'use strict';

const L = require(`leaflet`);
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
  priorityPlaces,
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
  [`ФВФ места МВД (Приоритет 1), ${priorityPlaces.one.quantity} шт`]: priorityPlaces.one.layer,
  [`ФВФ места МВД (Приоритет 2), ${priorityPlaces.two.quantity} шт`]: priorityPlaces.two.layer,
  [`ФВФ места МВД (Приоритет 3), ${priorityPlaces.three.quantity} шт`]: priorityPlaces.three.layer,
  [`ФВФ места МВД (Приоритет 4), ${priorityPlaces.four.quantity} шт`]: priorityPlaces.four.layer,
};

const checkedLayers = [
  backbone.layer,
  cityNet.layer,
  jkhNet.layer,
  // vokords.layer,
  // forsazhs.layer,
  // potoks.layer,
  // perekrestoks.layer,
  // radars.layer,
  // strelkas.layer,
  priorityPlaces.one.layer,
  priorityPlaces.two.layer,
  priorityPlaces.three.layer,
  // priorityPlaces.four.layer,
];

const map = L.map(`map`, {
  center: [54.357, 44.744],
  zoom: 8,
  layers: checkedLayers,
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);
