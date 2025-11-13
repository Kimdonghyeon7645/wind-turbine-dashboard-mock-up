import { useEffect, useRef } from "react";
import useMapStore from "@/stores/map";
import mapboxgl from "mapbox-gl";
import { createCustomLayer } from "@/utils/mapUtils";
import { mapLayers, mapSources } from "@/constants/mapStyles";

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

const useMap = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setMap = useMapStore((state) => state.setMap);

  const coords: [number, number][] = [
    [37.086940150957574, 128.52250331552574],
    [37.08862750084985, 128.52742381206144],
    [37.09177782438938, 128.5274681714174],
    [37.092560140962846, 128.52334363401536],
    [37.08985107848464, 128.5314610528353],
  ];
  const zOffsets: number[] = [630, 710, 670, 600, 750];

  const initMap = () => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: `${process.env.NEXT_PUBLIC_MAPBOX_STYLE}`,
      center: [128.522175, 37.087694],
      zoom: 15,
      pitch: 75,
      bearing: 40,
    });

    setMap(map);
    map.on("load", () => onMapLoaded(map));
    map.on("click", (e) => console.log(e.lngLat.lat, e.lngLat.lng));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initMap, []);

  const onMapLoaded = (map: mapboxgl.Map) => {
    mapSources.forEach((source) => map.addSource(...source));
    mapLayers.forEach((layer) => map.addLayer(layer));
    coords.forEach(([y, x], i) => map.addLayer(createCustomLayer(map, `${i}`, [x, y], zOffsets[i])));
  };

  return { containerRef };
};

export default useMap;
