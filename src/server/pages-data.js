'use strict';

const {ivnMunCost, trafficLightsData} = require(`../../data`);
const {cordons, placesByPriority, priorityNames} = require(`./prepared-fvf-data`);
const {Title, PageName, MapScript, Link} = require(`./constants`);

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
  data: {
    cordons,
    placesByPriority,
    priorityNames,
  },
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


const downloadableFiles = [
  {
    link: `download/fvf/places`,
    path: `fvf/places-fvf.xlsx`,
  },
  {
    link: `download/fvf/roadmap`,
    path: `fvf/roadmap-fvf.xlsx`,
  },
  {
    link: `download/ivn/roadmap`,
    path: `ivn/roadmap-ivn.xlsx`,
  },
  {
    link: `download/ivn/costs`,
    path: `ivn/costs-ivn.xlsx`,
  },
];

module.exports = {pages, downloadableFiles};
