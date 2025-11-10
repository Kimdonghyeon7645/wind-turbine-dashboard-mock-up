const landSrc = "land";
const parkSrc = "park";
const circleSrc = "circle";

const landSource: [string, mapboxgl.SourceSpecification] = [landSrc, { type: "geojson", data: "/land-polygon.geojson" }];
const parkSource: [string, mapboxgl.SourceSpecification] = [parkSrc, { type: "geojson", data: "/park-boundary.geojson" }];
const circleSource: [string, mapboxgl.SourceSpecification] = [circleSrc, { type: "geojson", data: "/point.geojson" }];

const landLayer: mapboxgl.FillLayerSpecification = {
  id: `${landSrc}-layer`,
  source: landSrc,
  type: "fill",
  paint: {
    "fill-color": "#5060ea",
    "fill-opacity": 0.6,
    "fill-outline-color": "#000000",
  },
};

const parkLayer: mapboxgl.FillLayerSpecification = {
  id: `${parkSrc}-layer`,
  source: parkSrc,
  type: "fill",
  paint: {
    "fill-color": "#1f7d30",
    "fill-opacity": 0.5,
    "fill-outline-color": "#000000",
  },
};

export const circleLayer: mapboxgl.CircleLayerSpecification = {
  id: `${circleSrc}-layer`,
  source: circleSrc,
  type: "circle",
  paint: {
    "circle-radius": 4,
    "circle-color": "#ffffff",
    "circle-stroke-color": "#ffffff",
    "circle-stroke-width": 1,
  },
  minzoom: 11.5,
  maxzoom: 22,
};

export const mapSources = [landSource, parkSource, circleSource];
export const mapLayers = [landLayer, parkLayer, circleLayer];
