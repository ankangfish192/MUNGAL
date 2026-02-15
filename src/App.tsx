import { useState } from 'react';

const ASSETS = {
  CG_01: "url('/cg_01_classroom_empty.jpg')",
  CG_02: "url('/cg_02_xiayi_back.jpg')",
  CG_03: "url('/cg_03_xiayi_face.jpg')",
  CG_04: "url('/cg_04_meeting_serious.jpg')",
  CG_05: "url('/cg_05_hallway_night.jpg')",
  CG_06: "url('/cg_06_hold_hand.jpg')",
};

// --- 内联 SVG 组件 ---
const IconBook = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
);

const IconArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

type ScriptItem = {
  bg: string;
  speaker: string;
  text: string;
  action?: string;
  isChoice?: boolean;
  choices?: Array<{ label: string }>;
};

const App = () => {
  const [stage, setStage] = useState<string>('TITLE');
  const [index, setIndex] = useState<number>(0);
  const [showGlossary, setShowGlossary] = useState<boolean>(false);

  const script: ScriptItem[] = [
    // 序幕：重逢的冷气
    {
      bg: ASSETS.CG_01,
      speaker: "旁白",
      text: "炎炎夏日，蝉鸣阵阵。推开会议室的门，冷气扑面而来，却吹不散心头的燥热。",
    },
    {
      bg: ASSETS.CG_02,
      speaker: "霜实",
      text: "（心跳空了一拍）讲台上站着的那个红色背影……怎么这么眼熟？",
      action: "心里嘀咕：救命，阁指怎么是前妻姐。这太尴尬了。",
    },
    {
      bg: ASSETS.CG_03,
      speaker: "夏伊",
      text: "阁首你来了。嗯……呃，你先坐吧。",
      action: "夏伊转身看到是你，表情明显僵硬了一下，指了指桌子上唯一剩下的空位。"
    },
    
    // 第一幕：内阁指令
    {
      bg: ASSETS.CG_04,
      speaker: "夏伊",
      text: "关于这次的局势更新，我们需要讨论一下应对方案。",
      action: "她很快恢复了工作状态，指着桌上的地图。"
    },
    {
      bg: ASSETS.CG_04,
      speaker: "霜实",
      text: "首相，我们要派什么部队去应对？可以配直升机吧。",
      isChoice: true,
      choices: [
        { label: "询问具体的直升机型号" },
        { label: "保持沉默，观察她的反应" }
      ]
    },
    {
      bg: ASSETS.CG_04,
      speaker: "夏伊",
      text: "可以。不过你们这个没有高精度侦查设备，看不到什么，只能尽量目测。",
    },

    // 第二幕：深夜的距离
    {
      bg: ASSETS.CG_05,
      speaker: "旁白",
      text: "深夜。人群散去，走廊里回荡着偶尔的键盘声。你们不期而遇。",
    },
    {
      bg: ASSETS.CG_05,
      speaker: "霜实",
      text: "……是你先放手的。",
      action: "声音在寂静的走廊里显得有些单薄。"
    },
    {
      bg: ASSETS.CG_05,
      speaker: "夏伊",
      text: "……是你先远离的。那时候我太忙了，也太想获胜了，不是故意冷落你的。",
    },
    {
      bg: ASSETS.CG_06,
      speaker: "夏伊",
      text: "再给我一次机会吧，霜实。我们重新开始。这一回，我们一起走向胜利。",
      action: "她突然伸手拉住了你的手腕，眼神里满是急切。",
      isChoice: true,
      choices: [
        { label: "……好。我的老同伴。" },
        { label: "那你要分我吃肠粉才行。" }
      ]
    },

    // 第三幕：雨过天晴
    {
      bg: ASSETS.CG_06,
      speaker: "旁白",
      text: "次日清晨。雨过天晴，阳光温柔。",
    },
    {
      bg: ASSETS.CG_06,
      speaker: "夏伊",
      text: "给，你最喜欢的肠粉。这次我可没忘加辣。",
      action: "她笑着把早餐递过来，窗外的彩虹若隐若现。"
    },
    {
      bg: ASSETS.CG_06,
      speaker: "霜实",
      text: "哼，算你有良心。",
    },
    {
      bg: ASSETS.CG_06,
      speaker: "旁白",
      text: "幸福是什么？大概是，珍惜当下吧。",
    }
  ];

  const current = script[index] || script[0];

  const handleNext = () => {
    if (index < script.length - 1) {
      setIndex(index + 1);
    } else {
      setStage('ENDING');
    }
  };

  if (stage === 'TITLE') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 relative">
        <div className="z-10 text-center transition-opacity duration-1000 opacity-100">
          <h1 className="text-6xl font-black mb-4 tracking-tighter">模联重逢录</h1>
          <p className="text-xl text-blue-400 italic mb-12 tracking-widest uppercase">Reunion: Cabinet</p>
          <button 
            onClick={() => setStage('PLAYING')}
            className="px-12 py-4 bg-white text-slate-900 rounded-full font-bold shadow-2xl hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95"
          >
            开始游戏
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'ENDING') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-10 text-center text-slate-900">
        <h2 className="text-5xl font-black mb-10 italic leading-tight">幸福是什么？<br/>大概是，珍惜当下吧。</h2>
        <button 
          onClick={() => { setStage('TITLE'); setIndex(0); }}
          className="px-10 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
        >
          返回标题
        </button>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-full flex flex-col relative overflow-hidden transition-all duration-1000 bg-cover bg-center" 
      style={{ backgroundImage: current.bg }}
    >
      {/* 顶部状态栏 */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold border border-white/20">
          SCENE {index + 1} / {script.length}
        </div>
        <button 
          onClick={() => setShowGlossary(true)} 
          className="p-2.5 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"
        >
          <IconBook />
        </button>
      </div>

      {/* 纯背景模式下，不再需要独立的立绘展示区 */}
      <div className="flex-grow"></div>

      {/* 对话框系统 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl z-40">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl">
          {current.speaker !== "旁白" && (
            <div className={`inline-block px-6 py-1.5 rounded-full text-sm font-black mb-5 shadow-lg ${current.speaker === '霜实' ? 'bg-blue-600' : 'bg-red-600'}`}>
              {current.speaker}
            </div>
          )}
          
          <div className="min-h-[100px] mb-6">
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-4">
              {current.text}
            </p>
            {current.action && (
              <p className="text-sm text-blue-300 italic">✧ {current.action}</p>
            )}
          </div>

          <div className="flex justify-end">
            {current.isChoice && current.choices ? (
              <div className="w-full grid gap-3">
                {current.choices.map((choice, choiceIndex) => (
                  <button 
                    key={choiceIndex} 
                    onClick={handleNext} 
                    className="w-full p-4 bg-white/5 hover:bg-blue-600/40 border border-white/10 rounded-2xl text-left transition-all hover:pl-8 flex justify-between items-center group"
                  >
                    <span className="font-bold">{choice.label}</span>
                    <IconArrow />
                  </button>
                ))}
              </div>
            ) : (
              <button 
                onClick={handleNext} 
                className="flex items-center gap-2 px-10 py-3 bg-blue-600 rounded-full font-black shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-95"
              >
                继续 <IconArrow />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 词典弹窗 */}
      {showGlossary && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6" onClick={() => setShowGlossary(false)}>
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black mb-6 text-slate-900">模联百科</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="font-bold text-blue-600 mb-1">阁指：</div>
                <div className="text-sm text-slate-500">内阁指导，负责学术审核与引导。</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="font-bold text-blue-600 mb-1">指令：</div>
                <div className="text-sm text-slate-500">代表起草的行动文件，影响推演局势。</div>
              </div>
            </div>
            <button 
              onClick={() => setShowGlossary(false)} 
              className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg"
            >
              返回会议
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
