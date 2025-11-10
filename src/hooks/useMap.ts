/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import useMapStore from "@/stores/map";
import mapboxgl from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

const useMap = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setMap = useMapStore((state) => state.setMap);

  const initMap = () => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: `${process.env.NEXT_PUBLIC_MAPBOX_STYLE}`,
      center: [128.520175, 37.087694],
      zoom: 18,
      pitch: 50,
    });

    setMap(map);
    map.on("load", () => onMapLoaded(map));
    // map.on("click", drawLineStr);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initMap, []);

  const onMapLoaded = (map: mapboxgl.Map) => {
    map.addLayer(createCustomLayer(map, "1", [128.520175, 37.087694]));
    map.addLayer(createCustomLayer(map, "2", [128.523175, 37.087694]));
    // map.loadImage("/car-model.png", (error1, image1) => {
    //   map.loadImage("/trans-model.png", (error2, image2) => {
    //     map.loadImage("/ess-model.png", (error3, image3) => {
    //       map.loadImage("/plant-model.png", (error4, image4) => {
    //         if (error1 || error2 || error3 || error4 || !image1 || !image2 || !image3 || !image4) return;
    //         map.addImage("car-model", image1, { sdf: true });
    //         map.addImage("trans-model", image2, { sdf: true });
    //         map.addImage("ess-model", image3, { sdf: true });
    //         map.addImage("plant-model", image4, { sdf: true });
    //         mapSources.forEach((source) => map.addSource(...source));
    //         mapLayers.forEach((layer) => map.addLayer(layer));
    //         drawPopup(map);
    //       });
    //     });
    //   });
    // });
  };

  const createCustomLayer = (map: mapboxgl.Map, modelId: string, lngLat: [number, number]): any => {
    const modelAltitude = 660;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(lngLat, modelAltitude);

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 0.1,
    };

    const camera = new THREE.Camera();
    const scene = new THREE.Scene();

    // const lightPositionList: [number, number, number][] = [
    //   [0, -70, 100],
    //   [0, 70, 100],
    //   [0, 70, 0],
    //   [0, -70, 0],
    //   [100, 70, 0],
    //   [100, -70, 0],
    // ];

    // lightPositionList.forEach((position) => {
    //   const directionalLight = new THREE.DirectionalLight(0x0000ff);
    //   directionalLight.intensity = 5;
    //   directionalLight.position.set(...position).normalize();
    //   scene.add(directionalLight);
    // });

    const loader = new GLTFLoader();
    loader.load("/result.gltf", (gltf) => {
      scene.add(gltf.scene);
    });

    const renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: map.painter.context.gl,
      antialias: true,
    });

    renderer.autoClear = false;

    return {
      id: modelId,
      type: "custom",
      renderingMode: "3d",
      // onAdd: () => {}, // Add logic that runs on layer addition if necessary.
      render: (gl: any, matrix: any) => {
        const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
        const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
        const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
          .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        camera.projectionMatrix = m.multiply(l);
        renderer.resetState();
        renderer.render(scene, camera);
        map.triggerRepaint();
      },
    };
  };

  // const drawLineStr = (e: mapboxgl.MapMouseEvent) => {
  //   const { lng, lat } = e.lngLat;
  //   console.log(lng, lat);
  //   lineStrData.push([lng, lat]);
  // };
  // const resetLineStr = () => setLineStrData([]);
  // const printLineStr = () => console.log(lineStrData);

  // const drawPopup = (map: mapboxgl.Map) => {
  //   mapPopupData.forEach((e) =>
  //     new mapboxgl.Popup({ closeOnClick: false, className: "custom-popup" })
  //       .setLngLat(e.coord)
  //       .setHTML(`<div><div class="title">${e.title}</div><div class="title-en">${e.titleEn}</div><div class="capacity">${e.capacity}kV</div></div>`)
  //       .addTo(map)
  //   );
  // };

  return { containerRef };
};

export default useMap;
