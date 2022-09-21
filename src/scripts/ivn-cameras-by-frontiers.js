'use strict';

const {saveToFile, getCsvFromJson} = require(`../utils`);
const {ivnBoxes, ivnCameras, ivnMunCameras, ivnMunBoxes} = require(`../../data`);

const stageZero = {
  boxes: ivnMunBoxes.filter((item) => item[`stage`] === `0`),
  cameras: ivnMunCameras.filter((item) => item[`stage`] === `0`),
};

const stageOne = {
  boxes: ivnBoxes.filter((item) => item[`stage`] === `1`),
  cameras: ivnCameras.filter((item) => item[`stage`] === `1`),
};

const stageTwo = {
  boxes: ivnBoxes.filter((item) => item[`stage`] === `2`),
  cameras: ivnCameras.filter((item) => item[`stage`] === `2`),
};

const stageThree = {
  boxes: ivnBoxes.filter((item) => item[`stage`] === `3`),
  cameras: ivnCameras.filter((item) => item[`stage`] === `3`),
};

const getStageData = (stageData, filename) => {
  for (const box of stageData.boxes) {
    const boxCameras = stageData.cameras
      .filter((item) => item[`frontier`] === box[`frontier`])
      .filter((item) => item[`address`] === box[`address`]);

    const cameras = {
      all: boxCameras.length,
      static: boxCameras.filter((item) => item[`type`] === `camera-static`).length,
      dynamic: boxCameras.filter((item) => item[`type`] === `camera-dynamic`).length,
      biometric: boxCameras.filter((item) => item[`type`] === `camera-biometric`).length,
    };
    box[`cameras`] = cameras;
  }

  const result = stageData.boxes.map((item) => ({
    stage: item[`stage`],
    frontier: item[`frontier`],
    static: item[`cameras`][`static`],
    dynamic: item[`cameras`][`dynamic`],
    biometric: item[`cameras`][`biometric`],
    all: item[`cameras`][`all`],
  }));

  saveToFile(`data/temp/${filename}`, getCsvFromJson(result, [`stage`, `frontier`, `static`, `dynamic`, `biometric`, `all`]))
    .then(() => console.log(`Operation is successful.`));
};

getStageData(stageZero, `stage-0.csv`);
getStageData(stageOne, `stage-1.csv`);
getStageData(stageTwo, `stage-2.csv`);
getStageData(stageThree, `stage-3.csv`);
