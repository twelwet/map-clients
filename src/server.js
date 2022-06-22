'use strict';

require(`dotenv`).config();
const express = require(`express`);
const path = require(`path`);
const PORT = process.env.SERVER_PORT;

const app = express();

app.set(`json spaces`, 2);
app.use(express.json());

const PUBLIC_DIR = `../public`;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
console.log(path.resolve(__dirname, PUBLIC_DIR));
app.use(express.urlencoded({extended: false}));

app.get(`/`, async (req, res) => {
  res.sendFile(path.join(__dirname, `index.html`));
});

app.get(`/clients`, async (req, res) => {
  res.sendFile(path.join(__dirname, PUBLIC_DIR, `clients.html`));
});

app.get(`/ivn`, async (req, res) => {
  res.sendFile(path.join(__dirname, PUBLIC_DIR, `ivn.html`));
});

app.get(`/fvf`, async (req, res) => {
  res.sendFile(path.join(__dirname, PUBLIC_DIR, `fvf.html`));
});

app.get(`/*`, async (req, res) => {
  res.redirect(`/`);
});

app.listen(
    PORT,
    () => console.log(`Server starts on port: ${PORT}`)
);
