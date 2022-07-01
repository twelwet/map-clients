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
  clients,
  remoteClients,
  unClients,
  plan2022Clients,
  allPlanningClients,
} = require(`./layers`);

mapIconsConfig();

const overlayMaps = {
  [`Узлы Магистрали`]: nodes.layer,
  [`ВОЛС Магистраль, ${backbone.distance} км`]: backbone.layer,
  [`ВОЛС СПД города, ${cityNet.distance} км`]: cityNet.layer,
  [`ВОЛС Дирекция ЖКХ, ${jkhNet.distance} км`]: jkhNet.layer,
  [`Подключены, адресов: ${clients.quantity}`]: clients.layer,
  [`Удаленные объекты, адресов: ${remoteClients.quantity}`]: remoteClients.layer,
  [`Не подкл., адресов: ${unClients.quantity}`]: unClients.layer,
  [`План-2022, адресов: ${plan2022Clients.quantity}`]: plan2022Clients.layer,
  [`Глобальный план, адресов: ${allPlanningClients.quantity}`]: allPlanningClients.layer,
};

const checkedLayers = [
  backbone.layer,
  cityNet.layer,
  jkhNet.layer,
  clients.layer,
  remoteClients.layer
];

const map = L.map(`map`, {
  center: MapSetting.CENTER,
  zoom: MapSetting.ZOOM,
  layers: checkedLayers,
});

tileLayer.addTo(map);

L.control.layers(null, overlayMaps).addTo(map);

