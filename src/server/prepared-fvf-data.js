'use strict';

const {fvfData} = require(`../../data`);

const getFvfPlaces = (data) => data.filter((item) => item[`id`].startsWith(`FVF-PLC`));
const getFvfPriorityPlaces = (data, level) => data.filter((item) => item[`priority_level`] === level);

const places = getFvfPlaces(fvfData);

const placesByPriority = {
  one: getFvfPriorityPlaces(places, `1`),
  two: getFvfPriorityPlaces(places, `2`),
  three: getFvfPriorityPlaces(places, `3`),
  four: getFvfPriorityPlaces(places, `4`),
};

const priorityNames = Object.keys(placesByPriority);

module.exports = {placesByPriority, priorityNames};
