const fs = require('fs');

const engPath = './app/engineering/page.tsx';
let eng = fs.readFileSync(engPath, 'utf8');

// Hero Section Note bg-black/20 p-6 rounded-2xl border border-white/5
eng = eng.replace(
  'className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5"',
  'className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light backdrop-blur-sm bg-black/20 p-6 rounded-2xl border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/5 shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none transition-all"'
);

// Timeline Item
// SpotlightCard className="p-8 backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors"
eng = eng.replace(
  '<SpotlightCard className="p-8 backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors">',
  '<SpotlightCard className="p-8 backdrop-blur-md bg-black/40 hover:bg-black/60 transition-all border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/10 shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none">'
);

// ConceptCard - NOTE: the explicit border is inside SpotlightCard component usually, but we can override className
// SpotlightCard className="p-6 h-full flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500"
eng = eng.replace(
  '<SpotlightCard className="p-6 h-full flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500">',
  '<SpotlightCard className="p-6 h-full flex flex-col justify-between group hover:bg-white/10 transition-all duration-500 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/10 shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none">'
);

// WorkflowSection box
// SpotlightCard className="relative overflow-hidden p-10 md:p-14 bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-xl"
eng = eng.replace(
  '<SpotlightCard className="relative overflow-hidden p-10 md:p-14 bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-xl">',
  '<SpotlightCard className="relative overflow-hidden p-10 md:p-14 bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-xl border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/10 shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none transition-all">'
);

// NoteCard
// SpotlightCard className="p-6 h-full border border-white/5 hover:border-lime-500/30 transition-all duration-300 group"
eng = eng.replace(
  '<SpotlightCard className="p-6 h-full border border-white/5 hover:border-lime-500/30 transition-all duration-300 group">',
  '<SpotlightCard className="p-6 h-full transition-all duration-300 group border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/5 hover:border-[var(--theme-lime-400)] dark:hover:border-lime-500/30 shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none group-hover:shadow-[4px_4px_0px_0px_var(--theme-lime-400)] dark:group-hover:shadow-none">'
);

// Notes Modal
// className="bg-zinc-950 border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl overflow-hidden"
eng = eng.replace(
  'className="bg-zinc-950 border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl overflow-hidden"',
  'className="bg-zinc-950 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-[8px_8px_0px_0px_var(--theme-white)] dark:shadow-2xl overflow-hidden transition-all"'
);

// Main bg-black text-white
eng = eng.replace(
  'className="min-h-screen bg-black text-white font-sans selection:bg-lime-500/30"',
  'className="min-h-screen bg-black text-white font-sans selection:bg-lime-500/30 transition-colors"'
);

fs.writeFileSync(engPath, eng);


const engNotesPath = './app/engineering/_notes/page.tsx';
let engNotes = fs.readFileSync(engNotesPath, 'utf8');

// Notes Detail Page Modal
// className="bg-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-4xl w-full relative shadow-[0_0_50px_rgba(132,204,22,0.1)] overflow-hidden max-h-[85vh] flex flex-col z-10"
engNotes = engNotes.replace(
  'className="bg-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-4xl w-full relative shadow-[0_0_50px_rgba(132,204,22,0.1)] overflow-hidden max-h-[85vh] flex flex-col z-10"',
  'className="bg-zinc-950 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-4xl w-full relative shadow-[8px_8px_0px_0px_var(--theme-white)] dark:shadow-[0_0_50px_rgba(132,204,22,0.1)] overflow-hidden max-h-[85vh] flex flex-col z-10 transition-all"'
);

fs.writeFileSync(engNotesPath, engNotes);
