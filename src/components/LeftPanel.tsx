import Switcher from "./Switcher";

const LeftPanel = () => {
  return (
    <div className="absolute z-10 top-12 left-1 w-95">
      <div
        className="
        h-10 w-40 py-2 pl-4 ml-1.5 flex items-center gap-3
    bg-[#00000077] backdrop-blur-xl rounded-lg text-white tracking-tight"
      >
        <div>등고선 표시</div>
        <Switcher />
      </div>
    </div>
  );
};

export default LeftPanel;
