'use strict';

const L = require(`leaflet`);
const {MapSetting} = require(`../constants`);
const {mapIconsConfig} = require(`../map-utils`);
const {tileLayer, nodes, backbone, cityNet, jkhNet} = require(`./layers`);

mapIconsConfig();

const overlayMaps = {
  [`Узлы Магистрали`]: nodes.layer,
  [`ВОЛС Магистраль, ${backbone.distance} км`]: backbone.layer,
  [`ВОЛС СПД города, ${cityNet.distance} км`]: cityNet.layer,
  [`ВОЛС Дирекция ЖКХ, ${jkhNet.distance} км`]: jkhNet.layer,
};

const checkedLayers = [nodes.layer, backbone.layer, cityNet.layer, jkhNet.layer];

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: checkedLayers,
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);

