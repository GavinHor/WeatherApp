# Preact Boilerplate / Starter Kit for a Weather App

## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Quick Boilerplate Overview](#Main_Features)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**

```sh
node -v
npm -v
```

## Installation
1. Download the folder
2. Open folder in terminal 
3. Install independancies using: 

```sh
npm install
```
4. Generate a production build in `./build` :

```sh
npm run build
```

5. Start local production server with [serve](https://github.com/zeit/serve):
```sh
npm start
```

## Main_Features
- Search bar is capable of finding a location by typing the City, Country, Postcode, or Longitude and Latitude
- Warning Alert that gives a description of the extreme weather that has triggered an alert (will not show if searched location does not have any alerts)
- Advanced information that shows Extra information about the current day

