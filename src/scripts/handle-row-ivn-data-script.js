'use strict';

const {rawIvnData} = require(`../../data`);
const {saveToFile, getCsvFromJson} = require(`../utils`);
const {FilePath} = require(`../constants`);

const DEFAULT_FIELDS = [`node_id`, `name`, `address`, `description`, `latitude`, `longitude`, `node_distance`, `cost`];

const pointsRawData = rawIvnData[`features`];

const rawPoints = pointsRawData.map((item) => ({
  [`node_id`]: `?`,
  name: item.properties.description || `Unknown`,
  address: `?`,
  description: ``,
  latitude: item.geometry.coordinates[0],
  longitude: item.geometry.coordinates[1],
  [`node_distance`]: `?`,
  cost: `?`,
}));

const clearPointName = (point, garbage) => {
  const cleanPoint = point;
  if (point.name.includes(garbage)) {
    const lastUsefulSymbol = point.name.length - garbage.length;
    cleanPoint.name = point.name.substring(0, lastUsefulSymbol);
  }
  return cleanPoint;
};


const getCleanPoints = (data, garbage) => {
  const cleanPoints = [];
  for (const item of data) {
    const cleanPoint = clearPointName(item, garbage);
    cleanPoints.push(cleanPoint);
  }
  return cleanPoints;
};

const points = getCleanPoints(rawPoints, `<br/>`);

const boxes = points.filter((item) => item.name.includes(`связи`));
const cameras = points.filter((item) => !item.name.includes(`связи`));

saveToFile(FilePath.IvnBoxes.CSV, getCsvFromJson(boxes, DEFAULT_FIELDS))
  .then(() => console.log(`Operation is successful.`));

saveToFile(FilePath.IvnCameras.CSV, getCsvFromJson(cameras, DEFAULT_FIELDS))
  .then(() => console.log(`Operation is successful.`));
