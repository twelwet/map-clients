'use strict';

const L = require(`leaflet`);
const {Icon, DISTANCE_LIMIT} = require(`../constants`);
const {
  getClients,
  getRemoteClients,
  getUnClients,
  getAllPlanningClients,
  getPlan2022Clients,
  getClientsPins,
} = require(`./utils`);

const {objects} = require(`../../../data`);

const clients = getClients(objects);
const remoteClients = getRemoteClients(objects);
const unClients = getUnClients(objects);
const allPlanningClients = getAllPlanningClients(objects, `нет`, `нет`, DISTANCE_LIMIT);
const plan2022Clients = getPlan2022Clients(objects);

const clientsPins = getClientsPins(clients, Icon.Path.CLIENT);
const clientsLayer = L.layerGroup(clientsPins);

const remoteClientsPins = getClientsPins(remoteClients, Icon.Path.REMOTE_CLIENT);
const remoteClientsLayer = L.layerGroup(remoteClientsPins);

const unClientsPins = getClientsPins(unClients, Icon.Path.UN_CLIENT);
const unClientsLayer = L.layerGroup(unClientsPins);

const allPlanningClientsPins = getClientsPins(allPlanningClients, Icon.Path.PLAN_TO_BUILD);
const allPlanningClientsLayer = L.layerGroup(allPlanningClientsPins);

const plan2022ClientsPins = getClientsPins(plan2022Clients, Icon.Path.PLAN_2022);
const plan2022ClientsLayer = L.layerGroup(plan2022ClientsPins);

module.exports = {
  clients: {
    layer: clientsLayer,
    quantity: clientsPins.length,
  },
  remoteClients: {
    layer: remoteClientsLayer,
    quantity: remoteClientsPins.length,
  },
  unClients: {
    layer: unClientsLayer,
    quantity: unClientsPins.length,
  },
  allPlanningClients: {
    layer: allPlanningClientsLayer,
    quantity: allPlanningClientsPins.length,
  },
  plan2022Clients: {
    layer: plan2022ClientsLayer,
    quantity: plan2022ClientsPins.length,
  },
};
