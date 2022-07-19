'use strict';

require(`dotenv`).config();
const express = require(`express`);
const path = require(`path`);
const {pages} = require(`./pages-data`);
const {getHeaderMenu, errorHandler} = require(`./utils`);
const PORT = process.env.SERVER_PORT;

const app = express();

app.set(`json spaces`, 2);
app.use(express.json());

const PUBLIC_DIR = `../../public`;
const DOWNLOAD_DIR = `public/download`;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.urlencoded({extended: false}));

app.set(`views`, `./src/server/templates`);
app.set(`view engine`, `pug`);

for (const page of pages) {
  app.get(page[`link`], (req, res) => {
    const pageContent = {
      title: page[`title`],
      mapScript: page[`mapScript`],
      headerMenu: getHeaderMenu(page[`menuName`], pages),
      data: page[`data`],
    };
    res.render(`${page[`pageName`]}`, pageContent);
  });
}

app.get(`/download/fvf/places`, (req, res) => {
  res.download(`${DOWNLOAD_DIR}/fvf/places-fvf.xlsx`, errorHandler);
});

app.get(`/download/ivn/roadmap`, (req, res) => {
  res.download(`${DOWNLOAD_DIR}/ivn/roadmap-ivn.xlsx`, errorHandler);
});

app.get(`/download/fvf/roadmap`, (req, res) => {
  res.download(`${DOWNLOAD_DIR}/fvf/roadmap-fvf.xlsx`, errorHandler);
});

app.listen(
    PORT,
    () => console.log(`Server starts on port: ${PORT}`)
);
