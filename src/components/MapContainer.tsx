"use client";

import useMap from "@/hooks/useMap";

const MapContainer = () => {
  const { containerRef } = useMap();

  return <div ref={containerRef} className="h-svh w-vw" />;
};

export default MapContainer;
