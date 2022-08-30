'use strict';

const {saveToFile, getJsonFromCsv} = require(`../utils`);
const {FilePath} = require(`../constants`);

const prepareJson = (pathToCsvFile, resultPath) => {
  getJsonFromCsv(pathToCsvFile)
    .then((data) => saveToFile(resultPath, JSON.stringify(data)));
};

prepareJson(FilePath.Nodes.CSV, FilePath.Nodes.JSON);
prepareJson(FilePath.Objects.CSV, FilePath.Objects.JSON);
prepareJson(FilePath.Fvf.CSV, FilePath.Fvf.JSON);
prepareJson(FilePath.FvfPlaces.CSV, FilePath.FvfPlaces.JSON);
prepareJson(FilePath.Ivn.CSV, FilePath.Ivn.JSON);
prepareJson(FilePath.IvnMunCost.CSV, FilePath.IvnMunCost.JSON);
prepareJson(FilePath.TrafficLights.CSV, FilePath.TrafficLights.JSON);
