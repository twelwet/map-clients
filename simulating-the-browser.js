'use strict';

// using: require(`../src/simulating-the-browser`)();

const simulateTheBrowser = () => {
  global.window = {
    screen: {
      devicePixelRatio: 1
    }
  };
  global.document = {
    documentElement: {
      style: {}
    },
    getElementsByTagName: function() { return []; },
    createElement: function() { return {}; }
  };
  global.navigator = {
    userAgent: 'nodejs',
    platform: 'nodejs'
  };
  global.L = require('leaflet');
};

module.exports = simulateTheBrowser;
