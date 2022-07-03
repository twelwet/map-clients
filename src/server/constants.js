'use strict';

const {ivnMunCost, trafficLightsData} = require(`../../data`);

const Title = {
  BACKBONE: `Магистраль`,
  CLIENTS: `Клиенты`,
  IVN: `ИВН`,
  FVF: `ФВФ`,
  TRAFFIC_LIGHTS: `Светофоры`,
};

const PageName = {
  BACKBONE: `main`,
  CLIENTS: `clients`,
  IVN: `ivn`,
  FVF: `fvf`,
  TRAFFIC_LIGHTS: `traffic_lights`,
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
};

const backbone = {
  title: Title.BACKBONE,
  mapScript: MapScript.BACKBONE,
  link: Link.BACKBONE,
  menuName: Title.BACKBONE,
  pageName: PageName.BACKBONE,
  data: {},
};

const clients = {
  title: Title.CLIENTS,
  mapScript: MapScript.CLIENTS,
  link: Link.CLIENTS,
  menuName: Title.CLIENTS,
  pageName: PageName.CLIENTS,
  data: {},
};

const ivn = {
  title: Title.IVN,
  mapScript: MapScript.IVN,
  link: Link.IVN,
  menuName: Title.IVN,
  pageName: PageName.IVN,
  data: {
    munCostData: ivnMunCost,
  },
};

const fvf = {
  title: Title.FVF,
  mapScript: MapScript.FVF,
  link: Link.FVF,
  menuName: Title.FVF,
  pageName: PageName.FVF,
  data: {},
};

const trafficLights = {
  title: Title.TRAFFIC_LIGHTS,
  mapScript: MapScript.TRAFFIC_LIGHTS,
  link: Link.TRAFFIC_LIGHTS,
  menuName: Title.TRAFFIC_LIGHTS,
  pageName: PageName.TRAFFIC_LIGHTS,
  data: {
    trafficLightsData,
  },
};

const pages = [backbone, clients, ivn, fvf, trafficLights];

module.exports = {pages};
