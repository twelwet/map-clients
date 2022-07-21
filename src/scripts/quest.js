'use strict';

const {saveToFile, getCsvFromJson} = require(`../utils`);
const {fvfData} = require(`../../data`);

const FIELDS = [`#`, `priority`, `roadSectionName`, `roadSectionAddress`, `locationName`, `locationKmM`, `locationDescription`, `locationLatitude`, `locationLongitude`];

const priorityOneData = fvfData.filter((item) => item[`priority_level`] === `1`);
const priorityTwoData = fvfData.filter((item) => item[`priority_level`] === `2`);
const priorityThreeData = fvfData.filter((item) => item[`priority_level`] === `3`);

const wholePriorityData = [...priorityOneData, ...priorityTwoData, ...priorityThreeData];

const getQuest = (data) => {
  const result = [];
  for (const entry of data) {
    let counter = 1;
    do {
      result.push({
        [`id`]: `${entry.id}.${counter}`,
        [`#`]: `${entry.id.slice(8)}.${counter}`,
        priority: entry[`priority_level`],
        roadSectionName: entry.name,
        roadSectionAddress: entry.address,
        locationName: `Вариант размещения ${entry.id.slice(8)}.${counter}`,
        locationKmM: `?`,
        locationDescription: `?`,
        locationLatitude: `?`,
        locationLongitude: `?`,
      });
      counter++;
    } while (counter <= 3);
  }

  return result;
};

const questPlaces = getQuest(wholePriorityData);

saveToFile(`data/temp/quest-places.csv`, getCsvFromJson(questPlaces, FIELDS))
  .then(() => console.log(`Operation is successful.`));
