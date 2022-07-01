'use strict';

const L = require(`leaflet`);
const {Icon} = require(`../constants`);
const {trafficLightsData} = require(`../../../data`);

const {getTrafficLightsPins} = require(`./utils`);

const trafficLightsPins = getTrafficLightsPins(trafficLightsData, Icon.Path.TRAFFIC_LIGHT);
const trafficLightsLayer = L.layerGroup(trafficLightsPins);

module.exports = {
  trafficLights: {
    layer: trafficLightsLayer,
    quantity: trafficLightsPins.length,
  },
};
