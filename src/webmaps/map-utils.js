'use strict';

const L = require(`leaflet`);
const {MapSetting} = require(`./constants`);

const getPinIcon = (iconPath) => L.icon({
  iconUrl: iconPath,
  iconSize: [30, 30],
  iconAnchor: [15, 20],
});

const mapIconsConfig = () => {
  const {icon, Marker} = L;
  const iconRetinaUrl = `images/marker.svg`;
  const iconUrl = `images/marker.svg`;
  const shadowUrl = `images/marker-shadow.svg`;

  Marker.prototype.options.icon = icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
};

const getTileLayer = () => {
  return L.tileLayer(MapSetting.LAYER_URL, {
    attribution: MapSetting.ATTRIBUTION,
    minZoom: MapSetting.MIN_ZOOM,
    maxZoom: MapSetting.MAX_ZOOM,
    subdomains: MapSetting.SUBDOMAINS,
    id: MapSetting.ID,
    tileSize: MapSetting.TILE_SIZE,
    zoomOffset: MapSetting.ZOOM_OFFSET,
    accessToken: MapSetting.ACCESS_TOKEN,
  });
};

module.exports = {
  getPinIcon,
  mapIconsConfig,
  getTileLayer,
};
