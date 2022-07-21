'use strict';

const {saveToFile, getCsvFromJson} = require(`../utils`);

const {
  fvfLinesPriorityOne,
  fvfLinesPriorityTwo,
  fvfLinesPriorityThree,
  fvfLinesPriorityFour,
} = require(`../../data`);

const fvfLinesPriority = [
  ...fvfLinesPriorityOne,
  ...fvfLinesPriorityTwo,
  ...fvfLinesPriorityThree,
  ...fvfLinesPriorityFour,
];

const getMiddlePins = (lines) => {
  const pins = [];
  for (const item of lines) {
    const middleIndex = Math.round(item.geometry.coordinates.length / 2);
    pins.push({
      name: item.properties.description,
      latitude: item.geometry.coordinates[middleIndex][1],
      longitude: item.geometry.coordinates[middleIndex][0],
    });
  }
  return pins;
};

const data = getMiddlePins(fvfLinesPriority);

saveToFile(`data/raw/fvf-middle-pins.csv`, getCsvFromJson(data, [`name`, `latitude`, `longitude`]))
  .then(() => console.log(`Operation is successful.`));
