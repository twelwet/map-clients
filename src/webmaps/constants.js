'use strict';

const MapSetting = {
  CENTER: [54.190051, 45.181145],
  ZOOM: 13,
  ID: `mapbox/streets-v11`,
  TILE_SIZE: 512,
  ACCESS_TOKEN: `your.mapbox.access.token`,
  ZOOM_OFFSET: -1,
  MAX_ZOOM: 18,
  LAYER_URL: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};

const Icon = {
  Path: {
    CLIENT: `images/marker-client.svg`,
    REMOTE_CLIENT: `images/marker-remote-client.svg`,
    UN_CLIENT: `images/marker-un-client.svg`,
    PLAN_TO_BUILD: `images/marker-plan-to-build.svg`,
    PLAN_2022: `images/marker-plan-2022.svg`,
    IVN_BOX: `images/marker-ivn-box.svg`,
    VOKORD: `images/vokord.svg`,
    FORSAZH: `images/forsazh.svg`,
    POTOK: `images/potok.svg`,
    PEREKRESTOK: `images/perekrestok.svg`,
    RADAR: `images/radar.svg`,
    STRELKA: `images/strelka.svg`,
    STRELKA_DAMAGED: `images/strelka-damaged.svg`,
    FVF_PLACES: `images/fvf-places.svg`,
    FVF_CHECKED_PLACES: `images/star-blue.svg`,
    IVN_CAMERA_STATIC: `images/camera-static.svg`,
    IVN_CAMERA_DYNAMIC: `images/camera-dynamic.svg`,
    IVN_CAMERA_BIOMETRIC: `images/camera-biometric.svg`,
    TRAFFIC_LIGHT: `images/traffic_light.svg`,
  },
};

const DISTANCE_LIMIT = 400;

module.exports = {MapSetting, Icon, DISTANCE_LIMIT};
