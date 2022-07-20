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
  priorityLines,
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
  [`ФВФ места МВД (Приоритет 1), ${priorityLines.one.quantity} шт`]: priorityLines.one.layer,
  [`ФВФ места МВД (Приоритет 2), ${priorityLines.two.quantity} шт`]: priorityLines.two.layer,
  [`ФВФ места МВД (Приоритет 3), ${priorityLines.three.quantity} шт`]: priorityLines.three.layer,
  [`ФВФ места МВД (Приоритет 4), ${priorityLines.four.quantity} шт`]: priorityLines.four.layer,
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
  priorityLines.one.layer,
  priorityLines.two.layer,
  priorityLines.three.layer,
  // priorityLines.four.layer,
];

const map = L.map(`map`, {
  center: [54.357, 44.744],
  zoom: 8,
  layers: checkedLayers,
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);
