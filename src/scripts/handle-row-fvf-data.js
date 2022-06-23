'use strict';

const fvfData = require(`../../data/raw/fvf-current.json`);
const {saveToFile, getCsvFromJson} = require(`../utils`);
const {FVF_FIELDS} = require(`../constants`);

const rawData = fvfData[`features`];

const mapToFormat = (data) => {
  return data.map((item) => ({
    [`node_id`]: `?`,
    [`object_type`]: ``,
    contractor: ``,
    name: item.properties.iconCaption ? item.properties.iconCaption : `Unknown`,
    [`is_work`]: true,
    model: ``,
    vendor: ``,
    address: item.properties.description || `Unknown`,
    description: ``,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
    [`node_distance`]: `?`,
    cost: `?`,
  }));
};

const data = mapToFormat(rawData);


saveToFile(`data/csv/fvf-data.csv`, getCsvFromJson(data, FVF_FIELDS))
  .then(() => console.log(`Operation is successful.`));
