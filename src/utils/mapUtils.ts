/* eslint-disable @typescript-eslint/no-explicit-any */
import mapboxgl from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const createCustomLayer = (map: mapboxgl.Map, modelId: string, [y, x]: [number, number], z: number = 100): any => {
  const camera = new THREE.Camera();
  const scene = new THREE.Scene();

  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat([y, x - 0.00015], z);
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: Math.PI / 2,
    rotateY: 0,
    rotateZ: 0,
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 0.09,
  };

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
