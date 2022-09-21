'use strict';

const {getCountable, getTotal, getDataByOwner, getBoxes, getCameras, getTrafficLightsData, saveDataToPriorityLines} = require(`./utils`);

const nodesRaw = require(`./json/nodes.json`);
const objects = require(`./json/objects.json`);
const backboneNetRaw = require(`./json/fiber-lines-backbone.json`);
const cityNet = require(`./json/fiber-lines-city-net.json`);
const jkhNet = require(`./json/fiber-lines-jkh-net.json`);
const fvfData = require(`./json/fvf.json`);
const fvfPlaces = require(`./json/fvf-places.json`);
const fvfLinesPriorityOneRaw = require(`./json/fvf-lines-priority-1.json`);
const fvfLinesPriorityTwoRaw = require(`./json/fvf-lines-priority-2.json`);
const fvfLinesPriorityThreeRaw = require(`./json/fvf-lines-priority-3.json`);
const fvfLinesPriorityFourRaw = require(`./json/fvf-lines-priority-4.json`);
const ivnData = require(`./json/ivn.json`);
const rawIvnData = require(`./raw/ivn.json`);
const rawIvnMunData = require(`./raw/ivn-mun.json`);
const rawIvnMunCost = require(`./json/ivn-mun-cost.json`);
const trafficLightsRawData = require(`./json/traffic_lights.json`);

const nodes = nodesRaw.filter((item) => item[`type`] === `node`);
const abNodes = nodesRaw.filter((item) => item[`type`] === `abon`);

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

const fvfLines = {
  priorityOne: saveDataToPriorityLines(fvfPlaces, fvfLinesPriorityOneRaw[`features`]),
  priorityTwo: saveDataToPriorityLines(fvfPlaces, fvfLinesPriorityTwoRaw[`features`]),
  priorityThree: saveDataToPriorityLines(fvfPlaces, fvfLinesPriorityThreeRaw[`features`]),
  priorityFour: saveDataToPriorityLines(fvfPlaces, fvfLinesPriorityFourRaw[`features`]),
};

const trafficLightsData = getTotal(getTrafficLightsData(getCountable(trafficLightsRawData, [`fiber`, `last_inch`, `hardware`, `vl-100`, `vl-1000`])), [`installation`, `subscription`]);

module.exports = {
  nodes,
  abNodes,
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
  fvfLines,
  trafficLightsData,
};
