'use strict';

const Title = {
  BACKBONE: `Магистраль`,
  CLIENTS: `Клиенты`,
  IVN: `ИВН`,
  FVF: `ФВФ`,
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
};

const clients = {
  title: Title.CLIENTS,
  mapScript: MapScript.CLIENTS,
  link: Link.CLIENTS,
  menuName: Title.CLIENTS,
};

const ivn = {
  title: Title.IVN,
  mapScript: MapScript.IVN,
  link: Link.IVN,
  menuName: Title.IVN,
};

const fvf = {
  title: Title.FVF,
  mapScript: MapScript.FVF,
  link: Link.FVF,
  menuName: Title.FVF,
};

const pages = [backbone, clients, ivn, fvf];

module.exports = {pages};
