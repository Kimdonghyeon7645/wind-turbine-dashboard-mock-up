"use client";

import useMapStore from "@/stores/map";
import { useState } from "react";

const Switcher = () => {
  const [isChecked, setIsChecked] = useState(false);
  const map = useMapStore((state) => state.map);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!map) return;
    // console.log(map.getStyle().layers);
    map.setPaintProperty("contour", "line-opacity", isChecked ? 0 : 0.25);
    map.setPaintProperty("contour (1)", "text-opacity", isChecked ? 0 : 0.6);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center -mr-1">
        <div className="relative">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="sr-only" />
          <div className={`box block h-6.5 w-12.5 rounded-full ${isChecked ? "bg-[#1967D1]" : "bg-[#ffffff33]"}`}></div>
          <div
            className={`absolute left-[3px] top-[3px] flex h-5 w-5.5 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher;
