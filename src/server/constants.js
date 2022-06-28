'use strict';

const {ivnMunCost} = require(`../../data`);

const Title = {
  BACKBONE: `Магистраль`,
  CLIENTS: `Клиенты`,
  IVN: `ИВН`,
  FVF: `ФВФ`,
};

const PageName = {
  BACKBONE: `main`,
  CLIENTS: `clients`,
  IVN: `ivn`,
  FVF: `fvf`,
};

const MapScript = {
  BACKBONE: `js/webmap-main.js`,
  CLIENTS: `js/webmap-clients.js`,
  IVN: `js/webmap-ivn.js`,
  FVF: `js/webmap-fvf.js`,
};

const Link = {
  BACKBONE: `/`,
  CLIENTS: `/clients`,
  IVN: `/ivn`,
  FVF: `/fvf`,
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

const pages = [backbone, clients, ivn, fvf];

module.exports = {pages};
