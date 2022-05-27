'use strict';

const {ivn} = require(`../data`);

const featuresRedundant = ivn[`features`];

const features = featuresRedundant.map((item) => ({
  description: item.properties.description || `Unknown`,
  latitude: item.geometry.coordinates[0],
  longitude: item.geometry.coordinates[1],
}));

features.filter((item) => item.description.includes(``))
