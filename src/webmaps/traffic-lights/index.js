'use strict';

const L = require(`leaflet`);
const {MapSetting} = require(`../constants`);
const {mapIconsConfig} = require(`../map-utils`);

const {
  tileLayer,
  backbone,
  cityNet,
  jkhNet,
} = require(`../main/layers`);

const {trafficLights} = require(`./layers`);

mapIconsConfig();

const overlayMaps = {
  [`ВОЛС Магистраль, ${backbone.distance} км`]: backbone.layer,
  [`ВОЛС СПД города, ${cityNet.distance} км`]: cityNet.layer,
  [`ВОЛС Дирекция ЖКХ, ${jkhNet.distance} км`]: jkhNet.layer,
  [`Светофоры, ${trafficLights.quantity} шт`]: trafficLights.layer,
};

const checkedLayers = [
  backbone.layer,
  cityNet.layer,
  jkhNet.layer,
  trafficLights.layer,
];

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: checkedLayers,
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);

