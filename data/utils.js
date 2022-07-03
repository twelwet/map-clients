'use strict';

const reducer = (previousValue, currentValue) => previousValue + currentValue;

const getCountable = (data, fields) => {
  for (const item of data) {
    for (const field of fields) {
      item[`${field}`] = +item[`${field}`];
    }
  }
  return data;
};

const getTotal = (data, fields) => {
  const total = {};
  for (const field of fields) {
    total[field] = data.map((item) => item[field]).reduce(reducer);
  }
  data[`total`] = total;
  return data;
};

const getDataByOwner = (data, ownerName) => data.filter((item) => item[`owner`] === ownerName);
const getBoxes = (data) => data.filter((item) => item[`type`] === `telecom-unit`);
const getCameras = (data) => data.filter((item) => item[`type`] !== `telecom-unit`);

module.exports = {getCountable, getTotal, getDataByOwner, getBoxes, getCameras};
