'use strict';

const L = require(`leaflet`);
const {Icon} = require(`../constants`);
const {ivnBoxes, ivnMunBoxes, ivnCameras, ivnMunCameras} = require(`../../../data`);

const {getIvnPins} = require(`./utils`);

const ivnCamerasStatic = ivnCameras.filter((item) => item[`description`].includes(`Стационарная`));
const ivnCamerasDynamic = ivnCameras.filter((item) => item[`description`].includes(`Поворотная`));

const ivnMunCamerasStatic = ivnMunCameras.filter((item) => item[`description`].includes(`Стационарная`));
const ivnMunCamerasDynamic = ivnMunCameras.filter((item) => item[`description`].includes(`Поворотная`));

const ivnBoxesPins = getIvnPins(ivnBoxes, Icon.Path.IVN_BOX);
const ivnBoxesLayer = L.layerGroup(ivnBoxesPins);

const ivnMunBoxesPins = getIvnPins(ivnMunBoxes, Icon.Path.IVN_BOX);
const ivnMunBoxesLayer = L.layerGroup(ivnMunBoxesPins);

const ivnCamerasStaticPins = getIvnPins(ivnCamerasStatic, Icon.Path.IVN_CAMERA_STATIC);
const ivnCamerasDynamicPins = getIvnPins(ivnCamerasDynamic, Icon.Path.IVN_CAMERA_DYNAMIC);
const ivnCamerasPins = [...ivnCamerasStaticPins, ...ivnCamerasDynamicPins];
const ivnCamerasLayer = L.layerGroup(ivnCamerasPins);

const ivnMunCamerasStaticPins = getIvnPins(ivnMunCamerasStatic, Icon.Path.IVN_CAMERA_STATIC);
const ivnMunCamerasDynamicPins = getIvnPins(ivnMunCamerasDynamic, Icon.Path.IVN_CAMERA_DYNAMIC);
const ivnMunCamerasPins = [...ivnMunCamerasStaticPins, ...ivnMunCamerasDynamicPins];
const ivnMunCamerasLayer = L.layerGroup(ivnMunCamerasPins);

module.exports = {
  ivnCameras: {
    layer: ivnCamerasLayer,
    quantity: ivnCamerasPins.length,
  },
  ivnBoxes: {
    layer: ivnBoxesLayer,
    quantity: ivnBoxesPins.length,
  },
  ivnMunCameras: {
    layer: ivnMunCamerasLayer,
    quantity: ivnMunCamerasPins.length,
  },
  ivnMunBoxes: {
    layer: ivnMunBoxesLayer,
    quantity: ivnMunBoxesPins.length,
  },
};
