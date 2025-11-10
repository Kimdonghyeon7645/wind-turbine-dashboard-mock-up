import { create } from "zustand";
import { MapState } from "./types";

const useMapStore = create<MapState>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
}));

export default useMapStore;
