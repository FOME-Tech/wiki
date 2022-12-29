# Wiki

FOME Wiki built using [Docusaurus 2](https://docusaurus.io/).

## Installation

Required [Node.js](https://nodejs.dev/) version: 16 or higher.

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Generate PDF

Required [Prince XML](https://www.princexml.com/).

Build and serve docs locally before generating PDF:

```bash
npm run build
npm run serve
```

In another terminal run this to generate PDF:

```bash
npm run pdf
```
