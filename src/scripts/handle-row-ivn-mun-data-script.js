'use strict';

const {rawIvnMunData} = require(`../../data`);
const {saveToFile, getCsvFromJson} = require(`../utils`);
const {FilePath} = require(`../constants`);

const DEFAULT_FIELDS = [`node_id`, `name`, `address`, `description`, `latitude`, `longitude`, `node_distance`, `cost`];

const rawData = rawIvnMunData[`features`];

// const rawLinesData = rawData.filter((item) => item[`geometry`][`type`] === `LineString`);
const rawCameras = rawData.filter((item) => item[`properties`][`description`].startsWith(`ИВН-МУН`));
const rawBoxes = rawData.filter((item) => item[`properties`][`description`].startsWith(`Щит связи`));

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

const cameras = mapToFormat(rawCameras);

for (const item of cameras) {
  item[`name`].includes(`С`)
    ? item[`description`] = `Стационарная камера`
    : item[`description`] = `Поворотная камера`;
}

const boxes = mapToFormat(rawBoxes);


saveToFile(FilePath.IvnMunCameras.CSV, getCsvFromJson(cameras, DEFAULT_FIELDS))
  .then(() => console.log(`Operation is successful.`));

saveToFile(FilePath.IvnMunBoxes.CSV, getCsvFromJson(boxes, DEFAULT_FIELDS))
  .then(() => console.log(`Operation is successful.`));
