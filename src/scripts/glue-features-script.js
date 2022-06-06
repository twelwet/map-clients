'use strict';

const {backboneNet, cityNet, jkhNet} = require(`../../data`);
const {saveToFile} = require(`../utils`);

const backboneNetFeatures = backboneNet[`features`];
const cityNetFeatures = cityNet[`features`];
const jkhNetFeatures = jkhNet[`features`];

const allLines = {
  type: backboneNet[`type`],
  metadata: {
    name: `ВОЛС`,
    creator: backboneNet[`metadata`][`creator`],
    description: `Зеленый - Магистраль\nСиний - Сеть города\nКрасный - Сеть Дирекции ЖКХ`,
  },
  features: [...backboneNetFeatures, ...cityNetFeatures, ...jkhNetFeatures],
};

saveToFile(`data/raw/data.json`, JSON.stringify(allLines));
