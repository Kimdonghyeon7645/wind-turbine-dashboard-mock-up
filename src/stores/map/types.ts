export type MapState = {
  map: mapboxgl.Map | null;
  setMap: (map: mapboxgl.Map) => void;
};
