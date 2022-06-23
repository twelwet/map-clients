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

const FilePath = {
  Nodes: {
    CSV: `data/csv/nodes.csv`,
    JSON: `data/json/nodes.json`,
  },
  Objects: {
    CSV: `data/csv/objects.csv`,
    JSON: `data/json/objects.json`,
  },
  IvnBoxes: {
    CSV: `data/csv/ivn-boxes.csv`,
    JSON: `data/json/ivn-boxes.json`,
  },
  IvnCameras: {
    CSV: `data/csv/ivn-cameras.csv`,
    JSON: `data/json/ivn-cameras.json`,
  },
  IvnMunBoxes: {
    CSV: `data/csv/ivn-mun-boxes.csv`,
    JSON: `data/json/ivn-mun-boxes.json`,
  },
  IvnMunCameras: {
    CSV: `data/csv/ivn-mun-cameras.csv`,
    JSON: `data/json/ivn-mun-cameras.json`,
  },
  Fvf: {
    CSV: `data/csv/fvf.csv`,
    JSON: `data/json/fvf.json`,
  },
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
  },
};

const DISTANCE_LIMIT = 400;

const FIELDS = [
  `node_id`,
  `inn`,
  `name`,
  `note`,
  `type`,
  `type_description`,
  `address`,
  `latitude`,
  `longitude`,
  `is_contracted`,
  `is_built`,
  `plan_2022`,
  `node_distance`,
  `cost`,
];

const FVF_FIELDS = [
  `node_id`,
  `object_type`,
  `contractor`,
  `name`,
  `is_work`,
  `model`,
  `vendor`,
  `address`,
  `description`,
  `latitude`,
  `longitude`,
  `node_distance`,
  `cost`,
];

module.exports = {MapSetting, FilePath, Icon, DISTANCE_LIMIT, FIELDS, FVF_FIELDS};
