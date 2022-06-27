'use strict';

const getHeaderMenu = (activePageName, allPages) => {
  return allPages.map((item) => ({
    menuName: item[`menuName`],
    link: item[`link`],
    isActive: item[`menuName`] === activePageName,
  }));
};

module.exports = {getHeaderMenu};
