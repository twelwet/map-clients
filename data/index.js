'use strict';

const {getCountable} = require(`./utils`);

const nodes = require(`./json/nodes.json`);
const objects = require(`./json/objects.json`);
const backboneNetRaw = require(`./json/fiber-lines-backbone.json`);
const cityNet = require(`./json/fiber-lines-city-net.json`);
const jkhNet = require(`./json/fiber-lines-jkh-net.json`);
const fvfData = require(`./json/fvf.json`);
const ivnData = require(`./json/ivn.json`);
const rawIvnData = require(`./raw/ivn.json`);
const rawIvnMunData = require(`./raw/ivn-mun.json`);
const rawIvnMunCost = require(`./json/ivn-mun-cost.json`);
const trafficLightsData = require(`./json/traffic_lights.json`);
const {getTotal, getDataByOwner, getBoxes, getCameras} = require('./utils');

const backboneNetLineStrings = backboneNetRaw[`features`].filter((item) => item[`geometry`][`type`] === `LineString`);

const backboneNet = {
  type: backboneNetRaw[`type`],
  metadata: backboneNetRaw[`metadata`],
  features: backboneNetLineStrings,
};

const ivnMunCost = getTotal(getCountable(rawIvnMunCost, [`fiber`, `hardware`]), [`fiber`, `hardware`]);

const ivnRmData = getDataByOwner(ivnData, `rm`);
const ivnMunData = getDataByOwner(ivnData, `city`);

const ivnBoxes = getBoxes(ivnRmData);
const ivnCameras = getCameras(ivnRmData);

const ivnMunBoxes = getBoxes(ivnMunData);
const ivnMunCameras = getCameras(ivnMunData);

module.exports = {
  nodes,
  objects,
  backboneNet,
  cityNet,
  jkhNet,
  rawIvnData,
  rawIvnMunData,
  ivnBoxes,
  ivnMunBoxes,
  ivnCameras,
  ivnMunCameras,
  ivnMunCost,
  fvfData,
  trafficLightsData,
};
