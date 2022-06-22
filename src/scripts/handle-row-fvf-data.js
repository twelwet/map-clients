'use strict';

const {rawFvfFutureLocationsData} = require(`../../data`);
const {saveToFile, getCsvFromJson} = require(`../utils`);
const {FilePath} = require(`../constants`);

const DEFAULT_FIELDS = [`node_id`, `name`, `address`, `description`, `latitude`, `longitude`, `node_distance`, `cost`];

const rawData = rawFvfFutureLocationsData[`features`];

const mapToFormat = (data) => {
  return data.map((item) => ({
    [`node_id`]: `?`,
    name: item.properties.description || `Unknown`,
    address: ``,
    description: ``,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
    [`node_distance`]: `?`,
    cost: `?`,
  }));
};

const data = mapToFormat(rawData);


saveToFile(FilePath.FvfFutureLocations.CSV, getCsvFromJson(data, DEFAULT_FIELDS))
  .then(() => console.log(`Operation is successful.`));
