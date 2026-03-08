const fs = require('fs');

const bentoPath = './components/BentoGrid.tsx';
let bento = fs.readFileSync(bentoPath, 'utf8');
// Fix Root
bento = bento.replace(
  'className="py-24 px-6 max-w-[1400px] mx-auto bg-background text-foreground transition-colors"',
  'className="py-24 px-6 max-w-[1400px] mx-auto bg-black text-white transition-colors"'
);
// Fix Bio Card
bento = bento.replace(
  'className="bg-zinc-100 dark:bg-zinc-900/50 border-2 border-black dark:border-zinc-800 dark:border-[1px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none p-8 md:p-12 rounded-3xl flex flex-col justify-between h-auto lg:h-80 relative overflow-hidden group transition-colors"',
  'className="bg-zinc-900/50 border-2 border-[var(--theme-white)] dark:border-zinc-800 dark:border-[1px] p-8 md:p-12 rounded-3xl flex flex-col justify-between h-auto lg:h-80 relative overflow-hidden group transition-all shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none"'
);
// Fix Bio Card Texts
bento = bento.replace(/<span className="block text-4xl font-black text-black dark:text-white">/g, '<span className="block text-4xl font-bold text-white">');
bento = bento.replace(/<span className="text-zinc-600 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider">/g, '<span className="text-zinc-500 text-xs uppercase tracking-wider">');

// Fix Location Card
bento = bento.replace(
  'className="bg-white dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 dark:border-[1px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none p-8 rounded-3xl flex items-center gap-6 h-full min-h-[140px] transition-colors"',
  'className="bg-zinc-950 border-2 border-[var(--theme-white)] dark:border-zinc-800 dark:border-[1px] p-8 rounded-3xl flex items-center gap-6 h-full min-h-[140px] transition-all shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none"'
);
bento = bento.replace(
  'className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black shrink-0"',
  'className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shrink-0"'
);

// Fix Socials Card
bento = bento.replace(
  'className="bg-lime-400 text-black border-2 border-black dark:border-[1px] dark:border-transparent dark:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 rounded-3xl flex flex-col justify-center gap-4 relative overflow-hidden group h-full min-h-[140px] transition-all"',
  'className="bg-lime-400 text-[var(--theme-white)] border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-transparent dark:shadow-none shadow-[4px_4px_0px_0px_var(--theme-white)] p-8 rounded-3xl flex flex-col justify-center gap-4 relative overflow-hidden group h-full min-h-[140px] transition-all"'
);

// Fix Scroller Right Column
bento = bento.replace(
  'className="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 dark:border-[1px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none w-full h-[400px] lg:h-full rounded-3xl p-6 flex flex-col relative overflow-hidden transition-colors"',
  'className="bg-zinc-900 border-2 border-[var(--theme-white)] dark:border-zinc-800 dark:border-[1px] w-full h-[400px] lg:h-full rounded-3xl p-6 flex flex-col relative overflow-hidden shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none transition-all"'
);
bento = bento.replace(
  'from-zinc-100 dark:from-zinc-900',
  'from-zinc-900'
);
bento = bento.replace(
  'from-zinc-100 dark:from-zinc-900',
  'from-zinc-900'
);

// Fix Stack Items
bento = bento.replace(
  'className="flex items-center gap-3 p-3 bg-white dark:bg-black/40 border-2 border-black dark:border-[1px] dark:border-white/5 rounded-xl hover:bg-lime-50 dark:hover:border-lime-400/30 transition-colors group shrink-0"',
  'className="flex items-center gap-3 p-3 bg-black/40 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-white/5 rounded-xl hover:border-lime-400/30 transition-all group shrink-0"'
);

fs.writeFileSync(bentoPath, bento);


const projPath = './components/ProjectGrid.tsx';
let proj = fs.readFileSync(projPath, 'utf8');

// Container
proj = proj.replace(
  'className="group relative w-full border-b-2 border-black dark:border-b dark:border-zinc-800 overflow-hidden block transition-colors bg-white dark:bg-transparent"',
  'className="group relative w-full border-b-2 border-[var(--theme-white)] dark:border-b dark:border-zinc-800 overflow-hidden block transition-all"'
);
// ID Container
proj = proj.replace(
  'className="hidden lg:flex col-span-1 flex-col items-center justify-center border-r-2 border-black dark:border-r dark:border-zinc-800/50 h-full pr-8 transition-colors"',
  'className="hidden lg:flex col-span-1 flex-col items-center justify-center border-r-2 border-[var(--theme-white)] dark:border-r dark:border-zinc-800/50 h-full pr-8 transition-all"'
);
proj = proj.replace(
  'className="text-xs font-mono text-zinc-600 mb-2 font-bold dark:font-normal"',
  'className="text-xs font-mono text-zinc-600 mb-2"'
);
proj = proj.replace(
  'className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-b from-zinc-900 to-black dark:from-zinc-700 dark:to-zinc-900 group-hover:from-black group-hover:to-zinc-700 dark:group-hover:from-white dark:group-hover:to-zinc-500 transition-all font-mono"',
  'className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-b from-zinc-700 to-zinc-900 group-hover:from-white group-hover:to-zinc-500 transition-all font-mono"'
);

// Title & Desc
proj = proj.replace(
  'className="text-3xl md:text-5xl font-black text-black dark:text-zinc-300 dark:font-bold group-hover:text-black dark:group-hover:text-white transition-colors tracking-tight mb-4 flex items-center gap-4"',
  'className="text-3xl md:text-5xl font-bold text-zinc-300 group-hover:text-white transition-colors tracking-tight mb-4 flex items-center gap-4"'
);
proj = proj.replace(
  'className="text-2xl text-black dark:text-[var(--theme-lime-400)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"',
  'className="text-2xl text-[var(--theme-lime-400)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"'
);
proj = proj.replace(
  'className="text-zinc-700 dark:text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl group-hover:text-black dark:group-hover:text-zinc-400 transition-colors"',
  'className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl group-hover:text-zinc-400 transition-colors"'
);

// Tech Stack
proj = proj.replace(
  'className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-black dark:border border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 group-hover:border-black dark:group-hover:border-zinc-700 transition-all"',
  'className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-zinc-800 bg-zinc-900/50 group-hover:border-zinc-700 shadow-[2px_2px_0px_0px_var(--theme-white)] dark:shadow-none transition-all"'
);

// Image
proj = proj.replace(
  'className="relative h-64 lg:h-48 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border dark:border-zinc-800 group-hover:border-black dark:group-hover:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-all"',
  'className="relative h-64 lg:h-48 w-full overflow-hidden rounded-xl bg-zinc-900 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-zinc-800 group-hover:border-[currentColor] dark:group-hover:border-zinc-600 shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none transition-all"'
);
proj = proj.replace(
  'className="absolute inset-0 bg-black/5 dark:bg-black/40 group-hover:bg-transparent transition-all duration-500 z-20 pointer-events-none"',
  'className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-20 pointer-events-none"'
);

// Main Grid
proj = proj.replace(
  'className="flex flex-col w-full border-t-2 border-black dark:border-t dark:border-zinc-800 transition-colors"',
  'className="flex flex-col w-full border-t-2 border-[var(--theme-white)] dark:border-t-[1px] dark:border-zinc-800 transition-all"'
);

fs.writeFileSync(projPath, proj);


const footerPath = './components/Footer.tsx';
let footer = fs.readFileSync(footerPath, 'utf8');

footer = footer.replace(
  'className="bg-zinc-100 dark:bg-black text-black dark:text-white relative border-t-2 border-black dark:border-t dark:border-zinc-900 transition-colors"',
  'className="bg-black text-white relative border-t-2 border-[var(--theme-white)] dark:border-t-[1px] dark:border-zinc-900 transition-all"'
);

footer = footer.replace(
  'className="border-b-2 border-black dark:border-b dark:border-zinc-900 transition-colors"',
  'className="border-b-2 border-[var(--theme-white)] dark:border-b-[1px] dark:border-zinc-900 transition-all"'
);

footer = footer.replace(
  'className="text-6xl md:text-9xl font-black tracking-tighter text-black dark:text-white leading-[0.85] mb-2 transition-colors"',
  'className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-2 transition-all"'
);

footer = footer.replace(
  'className="border-b-2 lg:border-b-0 lg:border-r-2 border-black dark:border-zinc-900 dark:border-b dark:lg:border-b-0 dark:lg:border-r p-6 md:p-12 lg:py-24 transition-colors"',
  'className="border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--theme-white)] dark:border-zinc-900 dark:border-b-[1px] dark:lg:border-b-0 dark:lg:border-r-[1px] p-6 md:p-12 lg:py-24 transition-all"'
);

footer = footer.replace(
  'className="w-full bg-white dark:bg-[var(--theme-zinc-900)]/30 border-2 border-black dark:border-b dark:border-t-0 dark:border-l-0 dark:border-r-0 dark:border-[var(--theme-zinc-800)] p-4 text-sm text-[var(--theme-black)] dark:text-[var(--theme-white)] placeholder:text-zinc-500 dark:placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none mb-4"',
  'className="w-full bg-[var(--theme-zinc-900)]/30 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-t-0 dark:border-l-0 dark:border-r-0 dark:border-[var(--theme-zinc-800)] p-4 text-sm text-[var(--theme-white)] placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none mb-4"'
);

footer = footer.replace(
  'className="w-full bg-white dark:bg-[var(--theme-zinc-900)]/30 border-2 border-black dark:border-b dark:border-t-0 dark:border-l-0 dark:border-r-0 dark:border-[var(--theme-zinc-800)] p-4 text-sm text-[var(--theme-black)] dark:text-[var(--theme-white)] placeholder:text-zinc-500 dark:placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none mb-6 resize-none"',
  'className="w-full bg-[var(--theme-zinc-900)]/30 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-t-0 dark:border-l-0 dark:border-r-0 dark:border-[var(--theme-zinc-800)] p-4 text-sm text-[var(--theme-white)] placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none mb-6 resize-none"'
);

footer = footer.replace(
  'className={`w-full py-5 px-8 font-bold text-lg uppercase tracking-widest flex items-center justify-between group transition-all border-2 border-black dark:border-[1px] dark:border-transparent rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none ${',
  'className={`w-full py-5 px-8 font-bold text-lg uppercase tracking-widest flex items-center justify-between group transition-all border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-transparent rounded-xl shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none ${'
);
footer = footer.replace(
  '                  : "bg-white dark:bg-[var(--theme-white)] text-black dark:text-[var(--theme-black)] hover:bg-[var(--theme-lime-400)] dark:hover:bg-[var(--theme-lime-400)]"',
  '                  : "bg-[var(--theme-white)] text-[var(--theme-black)] hover:bg-[var(--theme-lime-400)]"'
);


footer = footer.replace(
  'className="border-b-2 border-black dark:border-b dark:border-zinc-900 p-6 md:p-12 flex flex-col justify-center transition-colors"',
  'className="border-b-2 border-[var(--theme-white)] dark:border-b-[1px] dark:border-zinc-900 p-6 md:p-12 flex flex-col justify-center transition-all"'
);

footer = footer.replace(
  'className="group flex items-baseline gap-6 text-3xl md:text-5xl font-bold text-zinc-500 hover:text-black dark:hover:text-[var(--theme-white)] transition-colors"',
  'className="group flex items-baseline gap-6 text-3xl md:text-5xl font-bold text-zinc-500 hover:text-[var(--theme-white)] transition-colors"'
);
footer = footer.replace(
  '<span className="text-sm font-mono text-[var(--theme-lime-600)] dark:text-[var(--theme-lime-400)]/50 group-hover:text-[var(--theme-lime-600)] dark:group-hover:text-[var(--theme-lime-400)] transition-colors -translate-y-2">',
  '<span className="text-sm font-mono text-[var(--theme-lime-400)]/50 group-hover:text-[var(--theme-lime-400)] transition-colors -translate-y-2">'
);

footer = footer.replace(
  'className="p-6 md:p-12 flex flex-col justify-between gap-12 bg-zinc-200/50 dark:bg-zinc-950 transition-colors"',
  'className="p-6 md:p-12 flex flex-col justify-between gap-12 bg-zinc-950 transition-all"'
);

footer = footer.replace(
  'className="w-12 h-12 bg-white dark:bg-transparent border-2 border-black dark:border dark:border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[var(--theme-black)] hover:bg-[var(--theme-lime-400)] hover:border-[var(--theme-lime-400)] transition-all rounded-lg"',
  'className="w-12 h-12 border-2 border-[var(--theme-white)] dark:border-[1px] dark:border-zinc-800 shadow-[4px_4px_0px_0px_var(--theme-white)] dark:shadow-none flex items-center justify-center text-zinc-400 hover:text-[var(--theme-black)] hover:bg-[var(--theme-lime-400)] hover:border-[var(--theme-lime-400)] transition-all rounded-lg"'
);

footer = footer.replace(
  'className="flex items-center gap-3 text-black dark:text-zinc-300"',
  'className="flex items-center gap-3 text-zinc-300"'
);
footer = footer.replace(
  'className="p-2 border-2 border-black bg-white dark:border-0 dark:bg-[var(--theme-zinc-900)] rounded-full text-black dark:text-[var(--theme-lime-400)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"',
  'className="p-2 bg-[var(--theme-zinc-900)] rounded-full text-[var(--theme-lime-400)] border-2 border-[var(--theme-white)] dark:border-0 shadow-[2px_2px_0px_0px_var(--theme-white)] dark:shadow-none"'
);

footer = footer.replace(
  'className="flex items-center justify-between pt-8 border-t-2 border-black dark:border-t dark:border-zinc-900/50 text-xs font-mono text-zinc-600 uppercase transition-colors"',
  'className="flex items-center justify-between pt-8 border-t-2 border-[var(--theme-white)] dark:border-t-[1px] dark:border-zinc-900/50 text-xs font-mono text-zinc-600 uppercase transition-all"'
);

fs.writeFileSync(footerPath, footer);

