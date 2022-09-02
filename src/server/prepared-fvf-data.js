'use strict';

const {fvfData} = require(`../../data`);

const getCordons = (data) => data.filter((item) => item[`model`].startsWith(`Кордон`));

const cordons = getCordons(fvfData);
const onlinePoints = cordons.filter((item) => item[`is_online`] === `TRUE`).length;
const pautinaPoints = cordons.filter((item) => item[`is_pautina`] === `TRUE`).length;

module.exports = {cordons, onlinePoints, pautinaPoints};
