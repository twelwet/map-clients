'use strict';

const nodes = require(`./json/nodes.json`);
const objects = require(`./json/objects.json`);
const backboneNet = require(`./json/fiber-lines-backbone.json`);
const cityNet = require(`./json/fiber-lines-city-net.json`);
const jkhNet = require(`./json/fiber-lines-jkh-net.json`);
const rawIvnData = require(`./raw/ivn.json`);

module.exports = {nodes, objects, backboneNet, cityNet, jkhNet, rawIvnData};
