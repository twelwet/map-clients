'use strict';

const Title = {
  BACKBONE: `Магистраль`,
  CLIENTS: `Клиенты`,
  IVN: `ИВН`,
  FVF: `ФВФ`,
  TRAFFIC_LIGHTS: `Светофоры`,
  ROAD_MAPS: `Дорожные карты`,
};

const PageName = {
  BACKBONE: `main`,
  CLIENTS: `clients`,
  IVN: `ivn`,
  FVF: `fvf`,
  TRAFFIC_LIGHTS: `traffic_lights`,
  ROAD_MAPS: `road_maps`,
};

const MapScript = {
  BACKBONE: `js/webmap-main.js`,
  CLIENTS: `js/webmap-clients.js`,
  IVN: `js/webmap-ivn.js`,
  FVF: `js/webmap-fvf.js`,
  TRAFFIC_LIGHTS: `js/webmap-traffic-lights.js`,
};

const Link = {
  BACKBONE: `/`,
  CLIENTS: `/clients`,
  IVN: `/ivn`,
  FVF: `/fvf`,
  TRAFFIC_LIGHTS: `/traffic_lights`,
  ROAD_MAPS: `/road_maps`,
};

module.exports = {Title, PageName, MapScript, Link};
