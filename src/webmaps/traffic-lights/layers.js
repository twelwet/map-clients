'use strict';

const L = require(`leaflet`);
const {Icon} = require(`../constants`);
const {trafficLightsData} = require(`../../../data`);

const {getTrafficLightsPins, getNodesPins} = require(`./utils`);

const trafficLights = trafficLightsData.filter((item) => item[`type`] === `traffic_light`);
const nodes = trafficLightsData.filter((item) => item[`type`] === `node`);

const trafficLightsPins = getTrafficLightsPins(trafficLights, Icon.Path.TRAFFIC_LIGHT);
const nodesPins = getNodesPins(nodes);

const pins = [...trafficLightsPins, ...nodesPins];
const trafficLightsLayer = L.layerGroup(pins);

module.exports = {
  trafficLights: {
    layer: trafficLightsLayer,
    quantity: trafficLightsPins.length,
  },
};
