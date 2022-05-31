'use strict';

const nodes = require(`./json/nodes.json`);
const objects = require(`./json/objects.json`);
const backboneNet = require(`./json/fiber-lines-backbone.json`);
const cityNet = require(`./json/fiber-lines-city-net.json`);
const jkhNet = require(`./json/fiber-lines-jkh-net.json`);
const ivnBoxes = require(`./json/ivn-boxes.json`);
const ivnCameras = require(`./json/ivn-cameras.json`);
const rawIvnData = require(`./raw/ivn.json`);
const rawIvnMunData = require(`./raw/ivn-mun.json`);

module.exports = {
  nodes,
  objects,
  backboneNet,
  cityNet,
  jkhNet,
  rawIvnData,
  rawIvnMunData,
  ivnBoxes,
  ivnCameras,
};
