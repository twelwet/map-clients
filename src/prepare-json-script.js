'use strict';

const {saveToFile, getJsonFromCsv} = require(`./utils`);
const {FilePath} = require(`./constants`);

const prepareJson = (pathToCsvFile, resultPath) => {
  getJsonFromCsv(pathToCsvFile)
    .then((data) => saveToFile(resultPath, JSON.stringify(data)));
};

prepareJson(FilePath.Nodes.CSV, FilePath.Nodes.JSON);
prepareJson(FilePath.Objects.CSV, FilePath.Objects.JSON);
