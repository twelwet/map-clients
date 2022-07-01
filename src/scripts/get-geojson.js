'use strict';

const {saveToFile} = require(`../utils`);
const {trafficLightsData, backboneNet, cityNet, jkhNet} = require(`../../data`);

const backboneFeatures = backboneNet.features;
const cityNetFeatures = cityNet.features;
const jkhNetFeatures = jkhNet.features;

const trafficLightsFeatures = trafficLightsData.map((item) => ({
  type: `Feature`,
  id: item[`id`],
  geometry: {
    type: `Point`,
    coordinates: [item[`longitude`], item[`latitude`]],
  },
  properties: {
    description: item[`address`],
    [`marker-color`]: `#1e98ff`,
  },
}));

const allFeatures = [...backboneFeatures, ...cityNetFeatures, ...jkhNetFeatures, ...trafficLightsFeatures];

const result = {
  type: `FeatureCollection`,
  metadata: {
    name: `Магистраль + Светофоры`,
    creator: `Yandex Map Constructor`,
  },
  features: allFeatures,
};

saveToFile(`data/raw/data.geojson`, JSON.stringify(result));
