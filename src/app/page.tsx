import MapContainer from "@/components/MapContainer";
import RightPanel from "@/components/RightPanel";
import TitleBar from "@/components/TitleBar";

export default function Home() {
  return (
    <div className="h-svh w-vw">
      <MapContainer />
      <TitleBar />
      <RightPanel />
    </div>
  );
}
