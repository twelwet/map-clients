'use strict';

const {saveToFile, getJsonFromCsv} = require(`../utils`);
const {FilePath} = require(`../constants`);

const prepareJson = (pathToCsvFile, resultPath) => {
  getJsonFromCsv(pathToCsvFile)
    .then((data) => saveToFile(resultPath, JSON.stringify(data)));
};

prepareJson(FilePath.Nodes.CSV, FilePath.Nodes.JSON);
prepareJson(FilePath.Objects.CSV, FilePath.Objects.JSON);
prepareJson(FilePath.IvnBoxes.CSV, FilePath.IvnBoxes.JSON);
prepareJson(FilePath.IvnMunBoxes.CSV, FilePath.IvnMunBoxes.JSON);
prepareJson(FilePath.IvnCameras.CSV, FilePath.IvnCameras.JSON);
prepareJson(FilePath.IvnMunCameras.CSV, FilePath.IvnMunCameras.JSON);
