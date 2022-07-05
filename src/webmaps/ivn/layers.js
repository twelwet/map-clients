'use strict';

const L = require(`leaflet`);
const {Icon} = require(`../constants`);
const {ivnBoxes, ivnMunBoxes, ivnCameras, ivnMunCameras, ivnPlacesCameras} = require(`../../../data`);

const {getIvnPins, getCameras} = require(`./utils`);

const ivnCamerasStatic = getCameras.static(ivnCameras);
const ivnCamerasDynamic = getCameras.dynamic(ivnCameras);
const ivnCamerasBiometric = getCameras.biometric(ivnCameras);

const ivnMunCamerasStatic = getCameras.static(ivnMunCameras);
const ivnMunCamerasDynamic = getCameras.dynamic(ivnMunCameras);
const ivnMunCamerasBiometric = getCameras.biometric(ivnMunCameras);

const ivnPlacesCamerasStatic = getCameras.static(ivnPlacesCameras);
const ivnPlacesCamerasDynamic = getCameras.dynamic(ivnPlacesCameras);

const ivnBoxesPins = getIvnPins(ivnBoxes, Icon.Path.IVN_BOX);
const ivnBoxesLayer = L.layerGroup(ivnBoxesPins);

const ivnMunBoxesPins = getIvnPins(ivnMunBoxes, Icon.Path.IVN_BOX);
const ivnMunBoxesLayer = L.layerGroup(ivnMunBoxesPins);

const ivnCamerasStaticPins = getIvnPins(ivnCamerasStatic, Icon.Path.IVN_CAMERA_STATIC);
const ivnCamerasDynamicPins = getIvnPins(ivnCamerasDynamic, Icon.Path.IVN_CAMERA_DYNAMIC);
const ivnCamerasBiometricPins = getIvnPins(ivnCamerasBiometric, Icon.Path.IVN_CAMERA_BIOMETRIC);
const ivnCamerasPins = [...ivnCamerasStaticPins, ...ivnCamerasDynamicPins, ...ivnCamerasBiometricPins];
const ivnCamerasLayer = L.layerGroup(ivnCamerasPins);

const ivnMunCamerasStaticPins = getIvnPins(ivnMunCamerasStatic, Icon.Path.IVN_CAMERA_STATIC);
const ivnMunCamerasDynamicPins = getIvnPins(ivnMunCamerasDynamic, Icon.Path.IVN_CAMERA_DYNAMIC);
const ivnMunCamerasBiometricPins = getIvnPins(ivnMunCamerasBiometric, Icon.Path.IVN_CAMERA_BIOMETRIC);
const ivnMunCamerasPins = [...ivnMunCamerasStaticPins, ...ivnMunCamerasDynamicPins, ...ivnMunCamerasBiometricPins];
const ivnMunCamerasLayer = L.layerGroup(ivnMunCamerasPins);

const ivnPlacesCamerasStaticPins = getIvnPins(ivnPlacesCamerasStatic, Icon.Path.FVF_PLACES);
const ivnPlacesCamerasDynamicPins = getIvnPins(ivnPlacesCamerasDynamic, Icon.Path.FVF_PLACES);
const ivnPlacesPins = [...ivnPlacesCamerasStaticPins, ...ivnPlacesCamerasDynamicPins];
const ivnPlacesLayer = L.layerGroup(ivnPlacesPins);

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
  ivnPlaces: {
    layer: ivnPlacesLayer,
    quantity: ivnPlacesPins.length,
  },
};
