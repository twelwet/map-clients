'use strict';

const getHeaderMenu = (activePageName, allPages) => {
  return allPages.map((item) => ({
    menuName: item[`menuName`],
    link: item[`link`],
    isActive: item[`menuName`] === activePageName,
  }));
};

const errorHandler = (err) => {
  if (err) {
    console.log(err);
  }
};

module.exports = {getHeaderMenu, errorHandler};
