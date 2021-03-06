'use strict';

const {getCountable, getTotal, getDataByOwner, getBoxes, getCameras, getTrafficLightsData, saveDataToPriorityLines} = require(`./utils`);

const nodes = require(`./json/nodes.json`);
const objects = require(`./json/objects.json`);
const backboneNetRaw = require(`./json/fiber-lines-backbone.json`);
const cityNet = require(`./json/fiber-lines-city-net.json`);
const jkhNet = require(`./json/fiber-lines-jkh-net.json`);
const fvfData = require(`./json/fvf.json`);
const fvfLinesPriorityOneRaw = require(`./json/fvf-lines-priority-1.json`);
const fvfLinesPriorityTwoRaw = require(`./json/fvf-lines-priority-2.json`);
const fvfLinesPriorityThreeRaw = require(`./json/fvf-lines-priority-3.json`);
const fvfLinesPriorityFourRaw = require(`./json/fvf-lines-priority-4.json`);
const ivnData = require(`./json/ivn.json`);
const rawIvnData = require(`./raw/ivn.json`);
const rawIvnMunData = require(`./raw/ivn-mun.json`);
const rawIvnMunCost = require(`./json/ivn-mun-cost.json`);
const trafficLightsRawData = require(`./json/traffic_lights.json`);

const backboneNetLineStrings = backboneNetRaw[`features`].filter((item) => item[`geometry`][`type`] === `LineString`);

const backboneNet = {
  type: backboneNetRaw[`type`],
  metadata: backboneNetRaw[`metadata`],
  features: backboneNetLineStrings,
};

const ivnMunCost = getTotal(getCountable(rawIvnMunCost, [`fiber`, `hardware`]), [`fiber`, `hardware`]);

const ivnRmData = getDataByOwner(ivnData, `rm`);
const ivnMunData = getDataByOwner(ivnData, `city`);
const ivnPlacesData = getDataByOwner(ivnData, `-`);

const ivnBoxes = getBoxes(ivnRmData);
const ivnCameras = getCameras(ivnRmData);

const ivnMunBoxes = getBoxes(ivnMunData);
const ivnMunCameras = getCameras(ivnMunData);

const ivnPlacesCameras = getCameras(ivnPlacesData);

const fvfLinesPriorityOne = saveDataToPriorityLines(fvfData, fvfLinesPriorityOneRaw[`features`]);
const fvfLinesPriorityTwo = saveDataToPriorityLines(fvfData, fvfLinesPriorityTwoRaw[`features`]);
const fvfLinesPriorityThree = saveDataToPriorityLines(fvfData, fvfLinesPriorityThreeRaw[`features`]);
const fvfLinesPriorityFour = saveDataToPriorityLines(fvfData, fvfLinesPriorityFourRaw[`features`]);

const trafficLightsData = getTotal(getTrafficLightsData(getCountable(trafficLightsRawData, [`fiber`, `last_inch`, `hardware`, `vl-100`, `vl-1000`])), [`installation`, `subscription`]);

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
  ivnPlacesCameras,
  ivnMunCost,
  fvfData,
  fvfLinesPriorityOne,
  fvfLinesPriorityTwo,
  fvfLinesPriorityThree,
  fvfLinesPriorityFour,
  trafficLightsData,
};
