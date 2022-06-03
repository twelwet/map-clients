'use strict';

const {rawIvnMunData} = require(`../../data`);
const {saveToFile, getCsvFromJson} = require(`../utils`);
const {FilePath} = require(`../constants`);

const DEFAULT_FIELDS = [`node_id`, `name`, `address`, `description`, `latitude`, `longitude`, `node_distance`, `cost`];

const pointsRawData = rawIvnMunData[`features`];

const rawPoints = pointsRawData.filter((item) => item[`geometry`][`type`] === `Point`);

const cameras = rawPoints.map((item, index) => ({
  // TODO добавить поле цвета метки и по нему определить - поворотная, стационарная или ТКШ
  [`node_id`]: `?`,
  name: `ИВН-МУН-${index + 1}`,
  address: ``,
  description: `${item[`properties`][`name`]}`,
  latitude: item[`geometry`][`coordinates`][1],
  longitude: item[`geometry`][`coordinates`][0],
  [`node_distance`]: `?`,
  cost: `?`,
}));

// saveToFile(FilePath.IvnMunCameras.CSV, getCsvFromJson(cameras, DEFAULT_FIELDS))
//   .then(() => console.log(`Operation is successful.`));
