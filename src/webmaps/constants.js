'use strict';

const MapSetting = {
  CENTER: [54.190051, 45.181145],
  ZOOM: 13,
  ID: `mapbox/streets-v11`,
  TILE_SIZE: 512,
  ACCESS_TOKEN: `lYi7ttPIGK3BC5YO21nCScB2X17Vax7OAfLb6v5K7wt9x9zCeFVALLTWCsWvtlpv`,
  ZOOM_OFFSET: -1,
  MIN_ZOOM: 6,
  MAX_ZOOM: 18,
  SUBDOMAINS: `abcd`,
  LAYER_URL: `https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}`,
  ATTRIBUTION: `<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
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
    FVF_PRIORITY_ONE: `images/priority_1.svg`,
    FVF_PRIORITY_TWO: `images/priority_2.svg`,
    FVF_PRIORITY_THREE: `images/priority_3.svg`,
    FVF_PRIORITY_FOUR: `images/priority_4.svg`,
    IVN_CAMERA_STATIC: `images/camera-static.svg`,
    IVN_CAMERA_DYNAMIC: `images/camera-dynamic.svg`,
    IVN_CAMERA_BIOMETRIC: `images/camera-biometric.svg`,
    TRAFFIC_LIGHT: `images/traffic_light.svg`,
  },
};

const DISTANCE_LIMIT = 400;

module.exports = {MapSetting, Icon, DISTANCE_LIMIT};
