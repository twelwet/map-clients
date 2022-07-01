'use strict';

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
  IvnMunCost: {
    CSV: `data/csv/ivn-mun-cost.csv`,
    JSON: `data/json/ivn-mun-cost.json`,
  },
  Fvf: {
    CSV: `data/csv/fvf.csv`,
    JSON: `data/json/fvf.json`,
  },
  TrafficLights: {
    CSV: `data/csv/traffic_lights.csv`,
    JSON: `data/json/traffic_lights.json`,
  },
};

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

module.exports = {FilePath, FIELDS, FVF_FIELDS};
