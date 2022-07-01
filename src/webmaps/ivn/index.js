'use strict';

const L = require(`leaflet`);
const {MapSetting} = require(`../../constants`);
const {mapIconsConfig} = require(`../../map-utils`);

const {
  tileLayer,
  nodes,
  backbone,
  cityNet,
  jkhNet,
} = require(`../main/layers`);

const {
  ivnCameras,
  ivnMunCameras,
  ivnBoxes,
  ivnMunBoxes,
} = require(`./layers`);

mapIconsConfig();

const overlayMaps = {
  [`Узлы Магистрали`]: nodes.layer,
  [`ВОЛС Магистраль, ${backbone.distance} км`]: backbone.layer,
  [`ВОЛС СПД города, ${cityNet.distance} км`]: cityNet.layer,
  [`ВОЛС Дирекция ЖКХ, ${jkhNet.distance} км`]: jkhNet.layer,
  [`ИВН-РМ-ТКШ, ${ivnBoxes.quantity} шт`]: ivnBoxes.layer,
  [`ИВН-РМ-Камеры ${ivnCameras.quantity} шт`]: ivnCameras.layer,
  [`ИВН-МУН-ТКШ ${ivnMunBoxes.quantity} шт`]: ivnMunBoxes.layer,
  [`ИВН-МУН-Камеры ${ivnMunCameras.quantity} шт`]: ivnMunCameras.layer,
};

const checkedLayers = [
  backbone.layer,
  cityNet.layer,
  jkhNet.layer,
  ivnMunCameras.layer,
  ivnMunBoxes.layer,
];

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: checkedLayers,
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);
