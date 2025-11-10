import Image from "next/image";

const RightPanel = () => {
  return (
    <div className="absolute z-10 top-12 right-1 w-95 h-[calc(100svh-50px)]">
      <div
        className="
        h-[100px] py-2.5 px-3.5
    bg-[#00000077] backdrop-blur-xl rounded-lg text-white tracking-tight"
      >
        <div className="text-[1.2rem] font-semibold">선택한 입지</div>
        <div className="mt-1 text-[1.1rem] tracking-tighter">충청북도 단양군 영춘면 용진리 산 52</div>
        <div className="-mt-1.5 ml-px text-[1rem] font-light tracking-tighter text-[#ffffff88]">37.0869401, 128.5225033</div>
      </div>
      <div
        className="
        mt-1 h-[calc(100svh-155px)] py-2.5 px-3.5 flex flex-col gap-2.5
    bg-[#00000077] backdrop-blur-xl rounded-lg tracking-tight text-white"
      >
        <div className="text-[1.25rem] font-semibold">AI Assistant</div>
        <div className="text-[#ffffffee] flex flex-col gap-4 text-[0.94rem]">
          <div className="ml-auto bg-[#ffffff16] leading-5.5 px-3 py-2.5 rounded-tl-2xl rounded-b-2xl">
            선택한 위치에 풍력 터빈 설치 가능해?
            <br />
            법적 규제에도 문제가 없는지 검토해줘.
          </div>
          <div>
            안녕하세요, 선택하신 위치인
            <br /> <span className="font-bold">&apos;충청북도 단양군 영춘면 용진리 산 52&apos;</span> 에 대한 풍력 터빈 설치 가능성과 법적
            규제 준수 여부를 분석해 보겠습니다.
          </div>
          <div className="-mt-1">
            분석결과: <span className="font-bold text-[#94eeac]">설치 가능(조건부)</span> 합니다.
          </div>
          <div className="-mt-2">• 법적 필수 : 산지전용허가, 환경영향평가(규모 기준 충족시), 각종 협의 절차</div>
          <div className="-mt-2">• 주요 리스크 : 일부 생태자연도 2등급 중점 (약 12%), 산사태 2~3등급 인접, 임야(보전관리/농립지역)</div>
          <div className="-mt-1 font-bold">원문 근거 보기:</div>
          <div className="-mt-2">• 산지관리법 제 18조(산지전용허가)</div>
          <div className="-mt-2">• 환경영향평가법 시행령 별표(풍련산업발전 평가 대상 기준)</div>
          <div className="-mt-2">• 자연환경보전법/생태자연도 고시 (1,2등급 관리)(지방) 관련 조례의 정온시설 이격,합의 절차</div>
          <div className="ml-auto bg-[#ffffff16] leading-5.5 px-3 py-2.5 rounded-tl-2xl rounded-b-2xl">
            그러면 주거지, 학교 같은 정온시설의 <br />
            이격 기준은 어떻게 돼?
          </div>
          <div>
            일반적으로 <span className="font-bold">정온시설(주거,학교,병원,종교시설 등)</span>은
            <br />
            <span className="font-bold">소음,그림자깜박임</span> 영향 평가 대상이며,
            <br />
            여러 지자체 조례,가이드라인에서 주거지로부터 1,000m 이상 이격을 권고,요구합니다.
          </div>
          <div className="-mt-2">
            • 후보지에서 최근접 <span className="font-bold">주거지 1.6km, 학교 2.9km</span> - 기준 충족
          </div>
          <div className="-mt-2">
            • 단 <span className="font-bold">소음,그림자</span>는 배치,형식,고도,풍향에 따라 달라지므로, 세부 설계 시 정량 시뮬레이션 필요
          </div>
          <div className="-mt-1 font-bold">원문 근거 보기:</div>
          <div className="-mt-2">• (지자체) 환경,소음 관련 조례 (정온시설 기준),환경 영향평가 항목(소음,진동,일조,빛환경)</div>
        </div>
        <div className="w-full rounded-2xl bg-[#ffffff22] border-[#ffffff22] border text-[#ffffff66] py-[9px] px-4 flex justify-between">
          <div>무엇이든 물어보세요</div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
